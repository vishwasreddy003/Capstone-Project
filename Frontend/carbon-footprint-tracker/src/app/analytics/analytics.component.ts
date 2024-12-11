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
  public showDropdown: boolean = false; // Controls visibility of the dropdown
  private selectedChartType: string = 'household'; // Keeps track of the active chart type
  private transportationType: string = 'public'; // Default transportation type

  private chartData: any = {
    household: [],
    transportation: {
      public: [],
      private: []
    },
    wastage: [],
    overall: []
  };

  private months: string[] = Array(12).fill(''); // To be updated with backend data

  constructor(private trackerApiService: TrackerApiService) {}

  ngAfterViewInit(): void {
    this.loadChartData('household'); // Initialize with the default chart
  }

  loadChartData(type: string): void {
    this.trackerApiService.getTrendsData(type).subscribe(
      (data) => {
        // Process backend data
        console.log(data);
        const sortedData = data.sort((a, b) =>
          a.year !== b.year ? a.year - b.year : a.month.localeCompare(b.month)
        );
        const months = sortedData.map((d) => d.month.substring(0, 3).toUpperCase());
        const emissions = sortedData.map((d) => d.emissions);

        if (type === 'transportation') {
          this.chartData.transportation[this.transportationType] = emissions;
        } else {
          this.chartData[type] = emissions;
        }

        this.months = months; // Update months
        this.initializeChart(type); // Initialize chart with new data
      },
      (error) => {
        console.error('Error fetching trends data:', error);
      }
    );
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

    // Create the new chart instance
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
    this.selectedChartType = type;
    this.showDropdown = type === 'transportation'; 
    this.loadChartData(type); 
  }

  updateTransportationType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.transportationType = target.value;
    this.loadChartData('transportation');
  }
}
