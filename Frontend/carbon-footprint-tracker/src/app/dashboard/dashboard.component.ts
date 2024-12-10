import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { environment } from '../../environments/environment.development';
import { Task } from '../model/task';
import { TrackerApiService } from '../tracker-api.service';
import { forkJoin, map, switchMap } from 'rxjs';

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
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  // State variables
  categoryKeys: CategoryKey[] = ['overall', 'household', 'transportation', 'waste'];
  selectedTaskView: string = 'available';
  selectedCategory: CategoryKey = 'overall';

  // Data arrays
  availableGoals: Task[] = [];
  currentGoals: Task[] = [];
  parsedRecommendations: Recommendation[] = [];

  // Carbon and scoring data
  carbonData: Record<CategoryKey, number> = {
    overall: 0,
    household: 0,
    transportation: 0,
    waste: 0,
  };
  currentScore: number = 0;

  // Google AI instance
  private genAI: GoogleGenerativeAI;

  constructor(private trackerApiService: TrackerApiService) {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
  }

  // Lifecycle Hook
  ngOnInit(): void {
    this.loadEmissions();
    this.generateRecommendations();
    this.loadAvailableGoals();
  }

  // -----------------------------------
  // TASK VIEW METHODS
  // -----------------------------------

  selectTaskView(view: string): void {
    this.selectedTaskView = view;
    if (view === 'available') {
      this.loadAvailableGoals();
    } else if (view === 'current') {
      this.loadCurrentGoals();
    }
  }

  loadAvailableGoals(): void {
    this.trackerApiService.getAllGoals().subscribe(
      (response: any[]) => {
        console.log('Fetched Goals:', response);
        this.availableGoals = response.map((goal) => ({
          goalId: goal.goal_id,
          goalTitle: goal.goal_title,
          goalDescription: goal.goal_description,
          goalDifficulty: goal.goal_difficulty,
          goalFrequency: goal.goal_frequency,
          greenCoins: goal.green_coins,
        }));
        console.log('Mapped Goals:', this.availableGoals);
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }

  loadCurrentGoals(): void {
    this.trackerApiService
      .getUserGoalIds()
      .pipe(
        switchMap((goalIds: string[]) => {
          console.log('Fetched Goal IDs:', goalIds);
          // Fetched goals by their IDs
          return this.trackerApiService.getGoalsByIds(goalIds);
        }),
        // Mapped backend fields to the frontend Task model
        map((response: any[]) => {
          return response.map((goal) => ({
            goalId: goal.goal_id,
            goalTitle: goal.goal_title,
            goalDescription: goal.goal_description,
            goalDifficulty: goal.goal_difficulty,
            goalFrequency: goal.goal_frequency,
            greenCoins: goal.green_coins,
            startDate: goal.startDate,
            endDate: goal.endDate,
            status: goal.status,
          }));
        })
      )
      .subscribe(
        (mappedGoals: Task[]) => {
          // Update the currentGoals array with the mapped goals
          this.currentGoals = mappedGoals;
          console.log('Current Goals Loaded:', this.currentGoals);
        },
        (error) => {
          console.error('Error loading current goals:', error);
        }
      );
  }

  addTaskToCurrent(goalId: string): void {
    console.log(goalId);
    this.trackerApiService.addGoals(goalId).subscribe(
      (response) => {
        alert('Task added successfully');
        const task = this.availableGoals.find((goal) => goal.goalId === goalId);
        if (task) {
          this.currentGoals.push(task);
          this.availableGoals = this.availableGoals.filter(
            (g) => g.goalId !== goalId
          );
        }
      },
      (error) => {
        alert("Task wasn't added");
      }
    );
  }

  // -----------------------------------
  // CARBON DATA METHODS
  // -----------------------------------

  selectCategory(category: CategoryKey): void {
    this.selectedCategory = category;
    this.generateRecommendations();
  }

  loadEmissions(): void {
    forkJoin({
      waste: this.trackerApiService.getLatestWasteEmission(),
      transportation: this.trackerApiService.getLatestTransportEmission(),
      household: this.trackerApiService.getLatestHouseholdEmission(),
    }).subscribe(
      (results) => {
        // Update the carbon data
        this.carbonData['waste'] = results.waste;
        this.carbonData['transportation'] = results.transportation;
        this.carbonData['household'] = results.household;

        // Calculate the overall emissions
        this.carbonData['overall'] =
          this.carbonData['waste'] +
          this.carbonData['transportation'] +
          this.carbonData['household'];

        console.log(this.carbonData); 
      },
      (error) => {
        alert('Error fetching emissions data');
        console.error(error);
      }
    );
  }

  // -----------------------------------
  // RECOMMENDATION METHODS
  // -----------------------------------

  

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
            Generate 6 actionable and concise recommendations for reducing carbon emissions in daily activities for the category: ${this.selectedCategory}.
            Return the output as a JSON array, where each object contains:
            - icon: string (e.g., 🌿)
            - title: string (short title)
            - description: string (concise and actionable)
            - impact: string (e.g., -300kg CO₂/year)
        `;

        const result = await model.generateContent(prompt);

        let responseText = await result.response.text();
        console.log("Raw Response Text:", responseText);

        
        responseText = responseText
            .replace(/^.*?JSON/, "") 
            .replace(/```json|```/g, "") 

        console.log("Cleaned Response Text:", responseText);

        const recommendations = JSON.parse(responseText);


        if (Array.isArray(recommendations)) {
            this.parsedRecommendations = recommendations.map((rec: any) => ({
                icon: rec.icon,
                title: rec.title,
                text: rec.description, 
                impact: rec.impact,
            }));
            console.log("Parsed Recommendations as JSON:", this.parsedRecommendations);
        } else {
            throw new Error("Unexpected response format. Expected a JSON array.");
        }
    } catch (error) {
        console.error("Error generating recommendations:", error);
    }
}


}
