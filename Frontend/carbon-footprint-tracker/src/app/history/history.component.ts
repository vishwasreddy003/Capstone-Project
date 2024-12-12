import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TrackerApiService } from '../tracker-api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  data: any[] = [];
  dataType: string = 'energy';
  loading: boolean = false;
  error: string = '';

  constructor(private dataService: TrackerApiService) {}
  ngOnInit(): void {
    this.fetchData(this.dataType);
  }


  agg(e : number){
    return Math.round(e);
  }

  fetchData(type: string): void {
    this.loading = true;
    this.error = '';
    this.data = [];
    this.dataType = type;

    let apiCall;
    switch (type) {
      case 'energy':
        apiCall = this.dataService.getAllEnergyData();
        break;
      case 'transportation':
        apiCall = this.dataService.getAllTransportationData();
        break;
      case 'waste':
        apiCall = this.dataService.getAllWasteData();
        break;
      default:
        this.error = 'Invalid data type';
        this.loading = false;
        return;
    }

    apiCall.subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch data';
        this.loading = false;
        console.error(err);
      },
    });
  }

  getHeaders(dataType: string): string[] {
    switch (dataType) {
      case 'energy':
        return ['Month', 'Year', 'Units', 'Cylinders', 'Emissions'];
      case 'transportation':
        return ['Month', 'Year', 'Mode', 'Fuel Type', 'Distance', 'Emissions'];
      case 'waste':
        return ['Month', 'Year', 'Waste Type', 'Quantity', 'Emissions'];
      default:
        return [];
    }
  }
  
  getFields(dataType: string): string[] {
    switch (dataType) {
      case 'energy':
        return ['month', 'year', 'units', 'cylinders', 'emissions'];
      case 'transportation':
        return ['month', 'year', 'mode', 'type', 'distance', 'emissions'];
      case 'waste':
        return ['month', 'year', 'wasteType', 'qty', 'emissions'];
      default:
        return [];
    }
  }
  

}
