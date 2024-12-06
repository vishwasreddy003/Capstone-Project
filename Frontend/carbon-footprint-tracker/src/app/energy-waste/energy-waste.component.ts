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
 months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
 


 constructor(private formBuiler : FormBuilder,private trackerApiService:TrackerApiService){}

 energyWasteForm : FormGroup = new FormGroup({})
 yearsList: number[] = [];

 ngOnInit(): void {
  const currentYear = new Date().getFullYear();
  this.yearsList = Array.from({length: 11}, (_, i) => currentYear - 5 + i);
  this.energyWasteForm = this.formBuiler.group({
    month : ['',Validators.required],
    year : ['',Validators.required],
    electricity_units : ['',[Validators.required,Validators.min(0)]],
    no_of_gas_cylinders : ['',[Validators.required,Validators.min(0)]]
  });
}

 onSubmit() {
   if(this.energyWasteForm.valid ){
     const energyData = this.energyWasteForm.value;
     this.trackerApiService.submitEnergyData(energyData).subscribe(
       response=>{
         alert("Form submitted successfully");
       },
       error =>{
         console.log("Error submitting Form",error);
       }
     );
   } 
 }
}