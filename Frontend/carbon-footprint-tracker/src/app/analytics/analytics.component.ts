import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  imports:[CommonModule],
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {
  private chart: any;
  public showDropdown: boolean = false; // Controls visibility of the dropdown
  private selectedChartType: string = 'household'; // Keeps track of the active chart type
  private transportationType: string = 'public'; // Default transportation type

  private chartData: any = {
    household: [20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100, 110],
    transportation: {
      public: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      private: [50, 60, 70, 80, 90, 100, 110, 115, 120, 125, 130, 135]
    },
    wastage: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    overall: [30, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
  };

  private months: string[] = [
    'JANUARY', 'FEBRAUARY', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  ngAfterViewInit(): void {
    this.initializeChart('household'); // Initialize with the default chart
  }

  initializeChart(type: string): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
    // Destroy the existing chart instance
    if (this.chart) {
      this.chart.destroy();
    }
  
    let data;
    if (type === 'transportation') {
      // Transportation requires the selected transportation type
      data = this.chartData.transportation[this.transportationType];
    } else {
      // Other types directly map to the chartData
      data = this.chartData[type];
    }
  
    // Log the data for debugging
    console.log(`Initializing chart: ${type}`, data);
  
    // Create the new chart instance
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
            data: data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Carbon Emissions - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#333'
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#666'
            },
            ticks: {
              color: '#333',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Carbon Emissions (kg)',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#666'
            },
            ticks: {
              color: '#333',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            }
          }
        }
      }
    });
  }
  

  updateChart(type: string): void {
    // Set state variables
    this.selectedChartType = type;
    this.showDropdown = type === 'transportation'; 
    console.log(this.showDropdown,type);
    this.initializeChart(type); // Re-initialize the chart
  }

  updateTransportationType(event: Event): void {
    // Update the transportation type and re-initialize the chart
    const target = event.target as HTMLSelectElement;
    this.transportationType = target.value;
    this.initializeChart('transportation');
  }
}
