import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  selectedCategory: string = 'overall';
  selectedTaskView: string = 'current';

  carbonData: { [key: string]: number } = {
    overall: 2500,
    household: 1200,
    transportation: 800,
    waste: 500
  };

  calculateScore(): number {
    // Calculate score based on carbon emissions
    // Lower emissions = higher score
    const maxScore = 850; // Similar to credit score range
    const baseScore = 300;
    const totalEmissions = this.carbonData['overall'];
    const maxEmissions = 5000; // Example threshold

    // Calculate score inversely proportional to emissions
    const score = Math.round(
      baseScore + (maxScore - baseScore) * (1 - (totalEmissions / maxEmissions))
    );

    // Ensure score stays within bounds
    return Math.max(baseScore, Math.min(score, maxScore));
  }

  getScoreColor(): string {
    const score = this.calculateScore();
    if (score >= 700) {
      return 'linear-gradient(135deg, #28a745, #20c997)';
    } else if (score >= 500) {
      return 'linear-gradient(135deg, #ffc107, #fd7e14)';
    } else {
      return 'linear-gradient(135deg, #dc3545, #c82333)';
    }
  }

  tasks: { [key: string]: Task[] } = {
    current: [
      { id: 1, category: 'daily', task: 'Use reusable bags for shopping', impact: -2 },
      { id: 2, category: 'weekly', task: 'Carpool to work 3 days', impact: -5 },
      { id: 3, category: 'monthly', task: 'Install LED lightbulbs', impact: -20 }
    ],
    completed: [
      { id: 4, category: 'daily', task: 'Turn off unused lights', impact: -1, completed: true },
      { id: 5, category: 'weekly', task: 'Compost kitchen waste', impact: -3, completed: true }
    ],
    available: [
      { id: 6, category: 'monthly', task: 'Install solar panels', impact: -50 },
      { id: 7, category: 'weekly', task: 'Start a kitchen garden', impact: -8 }
    ]
  };

  getAIRecommendation(): string {
    const recommendations: { [key: string]: string } = {
      overall: 'Your overall carbon footprint is moderate. Focus on reducing transportation emissions for the biggest impact.',
      household: 'Consider switching to energy-efficient appliances and LED lighting to reduce household emissions.',
      transportation: 'Try carpooling or using public transport more frequently to reduce your transportation footprint.',
      waste: 'Implement composting and increase recycling to minimize your waste emissions.'
    };
    return recommendations[this.selectedCategory];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  selectTaskView(view: string): void {
    this.selectedTaskView = view;
  }

  getDisplayedTasks(): Task[] {
    return this.tasks[this.selectedTaskView] || [];
  }

  ngOnInit(): void {
  }
}