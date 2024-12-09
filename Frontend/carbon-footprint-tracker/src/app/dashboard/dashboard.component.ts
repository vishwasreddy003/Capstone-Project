import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { error } from 'console';
import { of } from 'rxjs/internal/observable/of';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Task } from '../model/task';
import { TrackerApiService } from '../tracker-api.service';

type CategoryKey = 'overall' | 'household' | 'transportation' | 'waste';

interface CarbonData {
  category: string;
  value: number;
}


interface Recommendation {
  icon: string;
  title: string;
  text: string;
  impact: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class DashboardComponent implements OnInit {

  selectedTaskView: string = 'available';

  availableGoals: Task[] = [];

  selectTaskView(view: string): void {
    this.selectedTaskView = view;
    if (view === 'available') {
      this.loadAvailableGoals();
    }
  }

  getDisplayedTasks(): Task[] {
    return this.tasks[this.selectedTaskView] || [];
  }

  // baseurl + planetwise+user+{username}+addGoal+{goalID};

  // baseurl + planetwise+user+{username}+goals;


  selectedCategory: CategoryKey = 'overall';
  aiRecommendations: string[] = [];
  carbonData: Record<CategoryKey, number> = {
    overall: 2500,
    household: 1200,
    transportation: 800,
    waste: 500,
  };

  tasks: { [key: string]: Task[] } = {
    current: [],
    completed: [],
    available: [],
  };

  currentScore: number = 0;
  recommendations: Recommendation[] = [];
  private genAI: GoogleGenerativeAI;

  constructor(private trackerApiService:TrackerApiService) {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
    
  }

  ngOnInit(): void {
    //this.loadAvailableGoals(); 
    this.updateScore('overall');
     this.loadRecommendations();
  }

  loadAvailableGoals(): void {
    this.trackerApiService.getAllGoals().subscribe(
      (response: any[]) => {
        console.log('Fetched Goals:', response);
        // Map response data to the availableGoals array
        this.availableGoals = response.map((goal) => ({
          goalId:goal.goal_id,
          goalTitle: goal.goal_title,
          goalDescription: goal.goal_description,
          goalDifficulty: goal.goal_difficulty,
          goalFrequency: goal.goal_frequency,
          greenCoins: goal.green_coins,
        }));
        console.log('Mapped Goals:', this.availableGoals); // Debugging log
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }

  loadRecommendations(): void {
    const recommendationsByCategory: Record<CategoryKey, Recommendation[]> = {
      overall: [
        { icon: 'lightbulb', title: 'General Emission Reduction', text: 'Switch to renewable energy sources.', impact: '-400kg CO₂/month' },
        { icon: 'car', title: 'Carpooling', text: 'Share rides to reduce fuel consumption.', impact: '-200kg CO₂/month' },
        { icon: 'home', title: 'Energy-efficient Appliances', text: 'Use energy-efficient appliances to reduce electricity use.', impact: '-300kg CO₂/month' },
        { icon: 'solar-panel', title: 'Install Solar Panels', text: 'Harness solar energy to reduce electricity bills and CO₂ emissions.', impact: '-350kg CO₂/month' },
        { icon: 'tree', title: 'Plant Trees', text: 'Plant trees to absorb carbon and improve air quality.', impact: '-500kg CO₂/year' },
        { icon: 'leaf', title: 'Green Building Practices', text: 'Invest in green building materials and energy-efficient insulation.', impact: '-250kg CO₂/month' }
      ],
      
      household: [
        { icon: 'home', title: 'Energy-efficient Appliances', text: 'Install energy-efficient appliances like LEDs and solar panels.', impact: '-150kg CO₂/month' },
        { icon: 'thermometer', title: 'Lower Heating and Cooling', text: 'Adjust the thermostat to a moderate temperature.', impact: '-100kg CO₂/month' },
        { icon: 'water', title: 'Water Conservation', text: 'Use low-flow showerheads and fix leaks.', impact: '-50kg CO₂/month' },
        { icon: 'washing-machine', title: 'Efficient Laundry Practices', text: 'Wash clothes in cold water and air dry to reduce energy consumption.', impact: '-75kg CO₂/month' },
        { icon: 'fridge', title: 'Energy-efficient Fridges', text: 'Upgrade to energy-efficient refrigerators and keep them well-maintained.', impact: '-120kg CO₂/month' },
        { icon: 'insulation', title: 'Improve Home Insulation', text: 'Seal windows and doors to prevent energy loss and reduce heating costs.', impact: '-200kg CO₂/month' }
      ],
    
      transportation: [
        { icon: 'car', title: 'Public Transport', text: 'Use public transportation instead of driving alone.', impact: '-250kg CO₂/month' },
        { icon: 'bicycle', title: 'Biking', text: 'Opt for biking over short distances.', impact: '-100kg CO₂/month' },
        { icon: 'electric-car', title: 'Electric Vehicle', text: 'Switch to an electric vehicle to reduce emissions.', impact: '-350kg CO₂/month' },
        { icon: 'bus', title: 'Take the Bus', text: 'Use the bus for long commutes to reduce individual car use.', impact: '-150kg CO₂/month' },
        { icon: 'train', title: 'Use Trains for Long Distances', text: 'Opt for trains instead of flying to reduce emissions.', impact: '-400kg CO₂/month' },
        { icon: 'car', title: 'Car Maintenance', text: 'Keep your vehicle well-maintained to optimize fuel efficiency.', impact: '-50kg CO₂/month' }
      ],
    
      waste: [
        { icon: 'trash', title: 'Reduce Plastic Usage', text: 'Avoid single-use plastics and recycle them.', impact: '-120kg CO₂/month' },
        { icon: 'food', title: 'Food Waste Reduction', text: 'Compost food scraps to reduce methane emissions.', impact: '-100kg CO₂/month' },
        { icon: 'recycle', title: 'Recycling', text: 'Sort recyclables and ensure they are disposed of properly.', impact: '-80kg CO₂/month' },
        { icon: 'compost', title: 'Start Composting', text: 'Compost organic waste to reduce landfill and methane emissions.', impact: '-150kg CO₂/month' },
        { icon: 'shopping-cart', title: 'Buy in Bulk', text: 'Purchase items in bulk to reduce packaging waste.', impact: '-60kg CO₂/month' },
        { icon: 'donate', title: 'Donate Old Items', text: 'Donate unused goods instead of throwing them away to reduce waste.', impact: '-90kg CO₂/month' },
        { icon: 'battery', title: 'Recycle Batteries Properly', text: 'Recycle batteries to avoid hazardous waste and preserve resources.', impact: '-30kg CO₂/month' }
      ]
    };

    this.recommendations = recommendationsByCategory[this.selectedCategory] || [];
  }

  addTaskToCurrent(goalId:string){
    console.log(goalId);
    this.trackerApiService.addGoals(goalId).subscribe(
      response=>{
        alert("task added successfully");
      },
      error=>{
        alert("task didn't added");
      }
    );
  }

  
  selectCategory(category: CategoryKey): void {
    this.selectedCategory = category;
    this.updateScore(category);
    this.loadRecommendations();
    this.currentScore = this.calculateScore(category);
  }

  async generateRecommendations(): Promise<void> {
    try {
      const generationConfig = {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
        ],
        temperature: 0.8,
        top_p: 0.9,
        maxOutputTokens: 200,
      };
  
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-pro',
        ...generationConfig,
      });
  
      const prompt = `
        Generate 3 actionable and concise recommendations for reducing carbon emissions in daily activities for the category: ${this.selectedCategory}.
        Each recommendation should have:
        - An icon related to the recommendation (e.g., 'home', 'car', 'package').
        - A title describing the recommendation.
        - A brief text description of no more than 120 characters.
        - The impact on nature, such as CO₂ reduction (e.g., '-200kg CO₂/month').
        Example format:
        icon: 'home', title: 'Household Efficiency', text: 'Install energy-efficient appliances.', impact: '-150kg CO₂/month'
      `;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = await response.text();
  
      // Improved parsing logic
      this.recommendations = responseText
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => {
          const parsed = this.parseRecommendation(line);
          return parsed;
        });
  
      console.log(this.recommendations); // Debug the formatted recommendations
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  }
  
  private parseRecommendation(line: string): Recommendation {
    // Match key-value pairs like `key: 'value'`
    const regex = /(\w+):\s*'([^']+)'/g;
    const result: Record<string, string> = {};
    let match: RegExpExecArray | null;
  
    while ((match = regex.exec(line)) !== null) {
      result[match[1]] = match[2];
    }
  
    // Return a structured recommendation object
    return {
      icon: result['icon'] || 'lightbulb', // Default icon if not provided
      title: result['title'] || 'No Title',
      text: result['text'] || 'No Description',
      impact: result['impact'] || 'No Impact',
    };
  }
  

  private updateScore(category: CategoryKey): void {
    const baselineEmissions: Record<CategoryKey, number> = {
      overall: 3500,
      household: 1800,
      transportation: 1200,
      waste: 800,
    };

    const categoryEmissions = this.carbonData[category];
    const baselineEmission = baselineEmissions[category];

    this.currentScore = Math.min(
      100,
      Math.max(
        0,
        Math.round(100 - (categoryEmissions / baselineEmission) * 100),
      ),
    );
  }

  private calculateScore(category: CategoryKey): number {
    const baselineEmissions: Record<CategoryKey, number> = {
      overall: 3500,
      household: 1800,
      transportation: 1200,
      waste: 800,
    };

    const categoryEmissions = this.carbonData[category];
    const baselineEmission = baselineEmissions[category];

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(100 - (categoryEmissions / baselineEmission) * 100),
      ),
    );
  }
}
