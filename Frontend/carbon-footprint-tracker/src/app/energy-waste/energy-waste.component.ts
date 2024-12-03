import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnergyData } from '../model/EnergyData';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-energy-waste',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './energy-waste.component.html',
  styleUrl: './energy-waste.component.css'
})
export class EnergyWasteComponent {
 months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 month = " ";
 electricityUnits = 0;
 noOfGasCylinders = 0;

 constructor(private apiService:TrackerApiService){}

  onSubmit():void{
    const energyData:EnergyData = {
      month:this.month,
      electricityUnits:this.electricityUnits,
      noOfGasCylinders:this.noOfGasCylinders
    };

    this.apiService.submitEnergyData(energyData).subscribe(
      response => {
        console.log("Data successfully submitted",response);
      },
      error => {
        console.log("Error submitting form",error);
      }
    );
  }


}
