import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  selectedCategory: CategoryKey = 'overall';
  selectedTaskView: string = 'current';

  carbonData: Record<CategoryKey, number> = {
    overall: 2500,
    household: 1200,
    transportation: 800,
    waste: 500
  };

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

  currentScore: number = 0;
  
  recommendations: Recommendation[] = [];

  aiRecommendations: string[] = [];

  ngOnInit(): void {
    this.updateScore('overall');
    this.recommendations = this.getRecommendations();
  }

  getRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    if (this.carbonData['household'] > 1000) {
      recommendations.push({
        icon: 'home',
        title: 'Household Efficiency',
        text: 'Your household emissions are high. Consider installing a smart thermostat and energy-efficient appliances to reduce consumption.',
        impact: '-200kg CO₂/month'
      });
    }

    if (this.carbonData['transportation'] > 700) {
      recommendations.push({
        icon: 'car',
        title: 'Transportation',
        text: 'Try carpooling or using public transport twice a week. This small change can significantly reduce your carbon footprint.',
        impact: '-160kg CO₂/month'
      });
    }

    if (this.carbonData['waste'] > 400) {
      recommendations.push({
        icon: 'package',
        title: 'Waste Management',
        text: 'Start composting organic waste and ensure proper recycling. This can reduce your waste emissions substantially.',
        impact: '-100kg CO₂/month'
      });
    }

    recommendations.push({
      icon: 'lightbulb',
      title: 'Energy Savings',
      text: 'Replace all traditional bulbs with LED alternatives and unplug devices when not in use.',
      impact: '-50kg CO₂/month'
    });


    return recommendations;
  }

  selectCategory(category: CategoryKey): void {
    this.selectedCategory = category;
    this.updateScore(category);
    this.currentScore = this.calculateScore(category);
  }

  selectTaskView(view: string): void {
    this.selectedTaskView = view;
  }

  getDisplayedTasks(): Task[] {
    return this.tasks[this.selectedTaskView] || [];
  }

  private updateScore(category: CategoryKey): void {
    const maxScore = 100;
    const baselineEmissions: Record<CategoryKey, number> = {
      overall: 3500,
      household: 1800,
      transportation: 1200,
      waste: 800
    };

    const categoryEmissions = this.carbonData[category];
    const baselineEmission = baselineEmissions[category];
    
    this.currentScore = Math.min(100, Math.max(0,
      Math.round(100 - (categoryEmissions / baselineEmission * 100))
    ));
  }

  private calculateScore(category: CategoryKey): number {
    const maxScore = 100;
    const baselineEmissions: Record<CategoryKey, number> = {
      overall: 3500,
      household: 1800,
      transportation: 1200,
      waste: 800
    };

    const categoryEmissions = this.carbonData[category];
    const baselineEmission = baselineEmissions[category];
    
    return Math.min(100, Math.max(0,
      Math.round(100 - (categoryEmissions / baselineEmission * 100))
    ));
  }

  generateAIRecommendations(): void {
    const recommendations: { [key: string]: string[] } = {
      overall: [
        'Focus on reducing transportation emissions for the biggest impact.',
        'Consider switching to energy-efficient appliances.',
        'Try carpooling or using public transport more frequently.',
        'Implement composting and increase recycling.',
        'Explore renewable energy options like solar panels.'
      ],
      household: [
        'Switch to energy-efficient appliances.',
        'Install LED lighting.',
        'Reduce water heating costs by using solar water heaters.',
        'Improve home insulation to save energy.',
        'Use smart thermostats to optimize heating and cooling.'
      ],
      transportation: [
        'Carpool or use public transport more frequently.',
        'Consider electric or hybrid vehicles.',
        'Plan trips to minimize travel distance.',
        'Use bicycles for short distances.',
        'Regularly maintain your vehicle for optimal efficiency.'
      ],
      waste: [
        'Implement composting.',
        'Increase recycling efforts.',
        'Reduce single-use plastics.',
        'Donate or repurpose items instead of discarding.',
        'Buy in bulk to reduce packaging waste.'
      ]
    };

    this.aiRecommendations = recommendations[this.selectedCategory];
  }
}