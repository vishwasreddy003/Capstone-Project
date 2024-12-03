import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-energy-waste',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './energy-waste.component.html',
  styleUrl: './energy-waste.component.css'
})
export class EnergyWasteComponent implements OnInit{
 months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//  month = " ";
//  electricityUnits = 0;
//  noOfGasCylinders = 0;

 constructor(private formBuiler : FormBuilder,private trackerApiService:TrackerApiService){}

 energyWasteForm : FormGroup = new FormGroup({})

 ngOnInit(): void {
  this.energyWasteForm = this.formBuiler.group({
    month : ['',Validators.required],
    electricityUnits : ['',[Validators.required,Validators.min(0)]],
    noOfGasCylinders : ['',[Validators.required,Validators.min(0)]]
  });
}

 onSubmit() {
   if(this.energyWasteForm.valid ){
     const energyData = this.energyWasteForm.value;
     this.trackerApiService.submitEnergyData(energyData).subscribe(
       response=>{
         console.log("Form submitted successfully",response);
       },
       error =>{
         console.log("Error submitting Form",error);
       }
     );
   } 
 }
}