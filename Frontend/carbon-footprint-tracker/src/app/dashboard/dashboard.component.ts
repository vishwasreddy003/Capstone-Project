import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../environments/environment.development';

type CategoryKey = 'overall' | 'household' | 'transportation' | 'waste';

interface CarbonData {
  category: string;
  value: number;
}

interface Task {
  id: number;
  category: string;
  task: string;
  impact: number;
  completed?: boolean;
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
  selectedTaskView: string = 'current';

  selectTaskView(view: string): void {
    this.selectedTaskView = view;
  }

  getDisplayedTasks(): Task[] {
    return this.tasks[this.selectedTaskView] || [];
  }
  selectedCategory: CategoryKey = 'overall';
  aiRecommendations: string[] = [];
  carbonData: Record<CategoryKey, number> = {
    overall: 2500,
    household: 1200,
    transportation: 800,
    waste: 500,
  };

  tasks: { [key: string]: Task[] } = {
    current: [
      { id: 1, category: 'daily', task: 'Use reusable bags for shopping', impact: -2 },
      { id: 2, category: 'weekly', task: 'Carpool to work 3 days', impact: -5 },
      { id: 3, category: 'monthly', task: 'Install LED lightbulbs', impact: -20 },
    ],
    completed: [
      { id: 4, category: 'daily', task: 'Turn off unused lights', impact: -1, completed: true },
      { id: 5, category: 'weekly', task: 'Compost kitchen waste', impact: -3, completed: true },
    ],
    available: [
      { id: 6, category: 'monthly', task: 'Install solar panels', impact: -50 },
      { id: 7, category: 'weekly', task: 'Start a kitchen garden', impact: -8 },
    ],
  };

  currentScore: number = 0;
  recommendations: Recommendation[] = [];
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
  }

  ngOnInit(): void {
    this.updateScore('overall');
     this.generateRecommendations();
  }


  selectCategory(category: CategoryKey): void {
    this.selectedCategory = category;
    this.updateScore(category);
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
        .filter((line) => line.trim() !== '')
        .map((line) => {
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
