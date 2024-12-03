import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transportation.component.html',
  styleUrl: './transportation.component.css'
})
export class TransportationComponent implements OnInit{
  
  transportationModes: string[] = ['Car', 'Bus', 'Train', 'Bicycle', 'Walking'];
  fuelTypes: string[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  frequencies: string[] = ['Daily', 'Weekly', 'Monthly', 'Annual'];  // Frequency as an array
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  transportForm : FormGroup = new FormGroup({})

  constructor(private formBuilder:FormBuilder,private trackerApiService:TrackerApiService){}

  ngOnInit(): void {
    this.transportForm = this.formBuilder.group({
      transportationMode:['',Validators.required],
      fuelType: ['',Validators.required],
      distanceKm:['',Validators.required],
      mileage: ['',Validators.required],
      frequency:['',Validators.required],
      month:['',Validators.required]
    });
  }

  onSubmit(){
    if(this.transportForm.valid){
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        response=>{
          console.log("Form submitted successfully",response)
        },
        error=>{
          console.log("Error submitting Form",error)
        }
      );
    }
    }
}
