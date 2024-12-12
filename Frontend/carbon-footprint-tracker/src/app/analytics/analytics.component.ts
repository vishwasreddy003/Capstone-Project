import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TrackerApiService } from '../tracker-api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {
  private chart: any;
  public showDropdown: boolean = false; 
  private selectedChartType: string = 'household'; 

  private chartData: any = {
    household: [],
    transportation: [],
    wastage: [],
    overall: []
  };

  private months: string[] = Array(12).fill(''); 

  constructor(private trackerApiService: TrackerApiService) {}

  ngAfterViewInit(): void {
    this.loadChartData('household'); 
  }

  loadChartData(type: string): void {
    this.trackerApiService.getTrendsData(type).subscribe(
      (data) => {
        console.log(data);
    
        const months = data.map((d) => d.month.substring(0, 3).toUpperCase());
        const emissions = data.map((d) => d.emissions);
    
        this.chartData.type = emissions;
        this.months = months;
    
        this.initializeChart(type);
      },
      (error) => {
        console.error('Error fetching trends data:', error);
      }
    );
    
  }

  updateChart(type: string): void {
    this.selectedChartType = type;
    this.loadChartData(type); 
  }

  initializeChart(type: string): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
   
    if (this.chart) {
      this.chart.destroy();
    }
  
  
    const data = this.chartData.type;
  
    
    const yAxisLabel = type === 'overall' ? 'Green Score' : 'Carbon Emissions (kg)';
    const chartTitle =
      type === 'overall'
        ? 'Green Score Trends'
        : `Carbon Emissions - ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
            data: data,
            backgroundColor: function (context) {
              const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
              gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
              return gradient;
            },
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            borderRadius: 10, 
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: chartTitle,
            font: {
              size: 18,
              weight: 'bold',
            },
            color: '#333',
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 12,
            },
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#666',
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisLabel, 
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#666',
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
          },
        },
      },
    });
  }
  
  

  

}
