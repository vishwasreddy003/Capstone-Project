import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './transportation.component.html',
  styleUrl: './transportation.component.css'
})
export class TransportationComponent {
  transportationModes: string[] = ['Car', 'Bus', 'Train', 'Bicycle', 'Walking'];
  fuelTypes: string[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  frequencies: string[] = ['Daily', 'Weekly', 'Monthly', 'Annual'];  // Frequency as an array
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  

 
  transportationMode?: string;
  fuelType?: string;
  distanceKm?: number;
  frequency?: string;
  month?: string;
  mileage?: number;

}
