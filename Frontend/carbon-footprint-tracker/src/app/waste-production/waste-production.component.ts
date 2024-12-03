import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-waste-production',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './waste-production.component.html',
  styleUrl: './waste-production.component.css'
})
export class WasteProductionComponent implements OnInit{

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  wasteTypes: string[] = ['FOODWASTE','NONFOODWASTE'];

  wasteProdForm : FormGroup = new FormGroup({})

  constructor(private formBuilder:FormBuilder,private trackerApiService:TrackerApiService){}

  ngOnInit(): void {
    this.wasteProdForm = this.formBuilder.group({
      month : ['',Validators.required],
      waste_type : ['',Validators.required],
      quantity_kgs : ['',Validators.required]
    });
  }

  onSubmit() {
    if(this.wasteProdForm.valid){
     const wasteProdData = this.wasteProdForm.value;
     this.trackerApiService.submitWasteProdData(wasteProdData).subscribe(
       response=>{
         console.log("Form submitted successfully",response);
       },
       error=>{
         console.log("Error submitting Form",error);
       }
     );
    }
  }










  // onSubmit(){
  //   const wasteProdData:WasteProdData = {
  //     month:this.month,
  //     wasteType:this.wasteType
  //   }

  //   this.apiService.submitWasteProdData(wasteProdData).subscribe(
  //     response=>{
  //       console.log("Data submitted succesfully",response);
  //     },
  //     error=>{
  //       console.log("Error submitting form",error);
  //     }
  //   );
  // }
}
