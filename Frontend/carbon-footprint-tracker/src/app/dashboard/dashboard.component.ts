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
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { type } from 'os';
import { response } from 'express';

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
  selectedTaskView: string = 'current';
  selectedCategory: CategoryKey = 'overall';
  scoreMessage: string = "Fetching you green score 😊";

  // Data arrays
  availableGoals: Task[] = [];
  currentGoals: Task[] = [];
  completedGoals: Task[] = [];
  parsedRecommendations: Recommendation[] = [];
  recommendations: Recommendation[] = [];
  submissionStatus: { message: string, type: string } | null = null;

  // Carbon and scoring data
  carbonData: Record<CategoryKey, number> = {
    overall: 0,
    household: 0,
    transportation: 0,
    waste: 0,
  };

  avgMonthlyData: Record<CategoryKey, number> = {
    overall: 180,
    household: 65.65,
    transportation: 60,
    waste: 54.35,
  };
  currentScore: number = 0;

  // Google AI instance
  private genAI: GoogleGenerativeAI;

  constructor(private trackerApiService: TrackerApiService, private errorHandler: ErrorHandlerService, private router: Router) {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
  }

  // Lifecycle Hook
  ngOnInit(): void {
    this.loadEmissions();
    this.generateRecommendations();
    this.loadCurrentGoals();
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

  loadCurrentGoals(): void {
    this.trackerApiService
      .getUserGoalIds()
      .pipe(
        switchMap((goalIds: string[]) => {
          console.log('Fetched Goal IDs:', goalIds);
          return this.trackerApiService.getGoalsByIds(goalIds);
        }),
        map((response: any[]) => {
          this.currentGoals = response.map((goal) => ({
            goalId: goal.goal_id,
            goalTitle: goal.goal_title,
            goalDescription: goal.goal_description,
            goalDifficulty: goal.goal_difficulty,
            goalFrequency: goal.goal_frequency,
            greenCoins: goal.green_coins,
            startDate: goal.startDate,
            endDate: goal.endDate,
          }));
          console.log('Current Goals Loaded:', this.currentGoals);
        })
      )
      .subscribe(
        () => {
          this.loadAvailableGoals(); // Call after currentGoals are loaded
        }
      );
  }

  loadAvailableGoals(): void {
    this.trackerApiService.getAllGoals().subscribe(
      (response: any[]) => {
        const currentGoalIds = this.currentGoals.map((goal) => goal.goalId);
        this.availableGoals = response
          .filter((goal) => !currentGoalIds.includes(goal.goal_id))
          .map((goal) => ({
            goalId: goal.goal_id,
            goalTitle: goal.goal_title,
            goalDescription: goal.goal_description,
            goalDifficulty: goal.goal_difficulty,
            goalFrequency: goal.goal_frequency,
            greenCoins: goal.green_coins,
            startDate: goal.startDate,
            endDate: goal.endDate,
          }));
        console.log('Mapped Available Goals:', this.availableGoals);
      },
      (error) => {
        this.handleError('Error fetching goals:');
      }
    );
  }



  addTaskToCurrent(goalId: string): void {
    console.log(goalId);
    this.trackerApiService.addGoals(goalId).subscribe(
      (response) => {
        alert('Task added successfully');
        this.submissionStatus = {
          message: 'Task added successfully',
          type: 'alert-success'
        };
        this.autoClearAlert();
        // Update current and available goals
        const task = this.availableGoals.find((goal) => goal.goalId === goalId);
        if (task) {
          this.currentGoals.push(task);
          this.availableGoals = this.availableGoals.filter(
            (g) => g.goalId !== goalId
          );
        }
      },
      (error) => {
        this.submissionStatus = {
          message: "Task wasn't added",
          type: 'alert-error'
        };
        this.autoClearAlert();
      }
    );
  }

  completeGoal(goalId: string) {
    this.trackerApiService.markAsCompleted(goalId).subscribe(
      (response) => {
        alert('Task completed successfully');
        this.submissionStatus = {
          message: 'Task Completed successfully',
          type: 'alert-success'
        };
        this.autoClearAlert();
        const task = this.currentGoals.find((goal) => goal.goalId === goalId);
        if (task) {
          this.completedGoals.push(task);
          this.currentGoals = this.currentGoals.filter(
            (g) => g.goalId !== goalId
          );
        }
      },
      (error) => {
        this.submissionStatus = {
          message: "Task wasn't completed",
          type: 'alert-error'
        };
        this.autoClearAlert();
      }
    )
  }

  private autoClearAlert(): void {
    setTimeout(() => {
      this.submissionStatus = null;
    }, 3000);
  }

  clearStatus(): void {
    this.submissionStatus = null;
  }

  handleError(errorMessage: string) {
    this.errorHandler.setError(500, errorMessage);  // Set error details in the service
    this.router.navigate(['/error']);  // Navigate to the error page
  }

  // -----------------------------------
  // CARBON DATA METHODS
  // -----------------------------------

  selectCategory(category: CategoryKey): void {
    this.selectedCategory = category;
    this.generateRecommendations();
    if (category == 'overall') {
      this.currentScore = Math.round(this.carbonData['overall'] / this.avgMonthlyData['overall'] * 100);
    } else if (category == 'household') {
      this.currentScore = Math.round(this.carbonData['household'] / this.avgMonthlyData['household'] * 100);
    } else if (category == 'transportation') {
      this.currentScore = Math.round(this.carbonData['transportation'] / this.avgMonthlyData['transportation'] * 100);
    } else {
      this.currentScore = Math.round(this.carbonData['waste'] / this.avgMonthlyData['waste'] * 100);
    }
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
        this.currentScore = Math.round(this.carbonData['overall'] / this.avgMonthlyData['overall'] * 100);
      },
      (error) => {
       // alert('Error fetching emissions data');
        console.error(error);
      }
    );
  }

  scoreClass(): string {
    if (this.currentScore < 100) {
      return 'green';
    } else if (this.currentScore <= 200) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  getscoreMessage(): string {
    if (this.currentScore < 100) {
      return 'Great job! Keep it up!';
    } else if (this.currentScore <= 200) {
      return 'Moderate score, let’s aim for improvement!';
    } else {
      return 'High carbon score! Time to take action!';
    }
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
