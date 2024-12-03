import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WasteProdData } from '../model/WasteProdData';
import { TrackerApiService } from '../tracker-api.service';

@Component({
  selector: 'app-waste-production',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './waste-production.component.html',
  styleUrl: './waste-production.component.css'
})
export class WasteProductionComponent {

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  wasteTypes: string[] = ['FOODWASTE','NONFOODWASTE'];

  month = '';
  wasteType=''  

  constructor(private apiService:TrackerApiService){}

  onSubmit():void{
    const wasteProdData:WasteProdData = {
      month:this.month,
      wasteType:this.wasteType
    }

    this.apiService.submitWasteProdData(wasteProdData).subscribe(
      response=>{
        console.log("Data submitted succesfully",response);
      },
      error=>{
        console.log("Error submitting form",error);
      }
    );
  }
}
