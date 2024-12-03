import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransportData } from '../model/TransportData';
import { TrackerApiService } from '../tracker-api.service';

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
  
  transportationMode ='';
  fuelType = '';
  distanceKm = 0;
  frequency = '';
  month = '';
  mileage= 0;

  constructor(private apiService:TrackerApiService){}

  onSubmit():void{
    const transportData:TransportData ={
      transportationMode:this.transportationMode,
      fuelType:this.fuelType,
      distanceKm:this.distanceKm,
      frequency:this.frequency,
      month:this.month,
      mileage:this.mileage
    }

    this.apiService.submitTransportData(transportData).subscribe(
      response=>{
        console.log("Data submitted successfully",response);
      },
      error=>{
        console.log("Error submitting form",error);
      }
    );
  }

}
