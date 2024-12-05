import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transportation.component.html',
  styleUrl: './transportation.component.css'
})
export class TransportationComponent implements OnInit{
  
  transportationModes: string[] = ['BIKE','CAR','BUS','TRAIN','FLIGHT','AUTO'];
  fuelTypes: string[] = ['DIESEL','EV','PETROL','JET_FUEL'];
  frequencies: string[] = ['DAILY','WEEKLY','MONTHLY'];  // Frequency as an array
  months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];


  transportForm : FormGroup = new FormGroup({})

  constructor(private formBuilder:FormBuilder,private trackerApiService:TrackerApiService,private router:Router){}

  ngOnInit(): void {
    this.transportForm = this.formBuilder.group({
      transportation_mode:['',Validators.required],
      fuel_type: ['',Validators.required],
      distance_km:['',Validators.required],
      frequency:['',Validators.required],
      month:['',Validators.required]
    });
  }

  onSubmit(){
    if(this.transportForm.valid){
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        response=>{
          alert("Form submitted successfully")
          this.router.navigate(['/energy']);
        },
        error=>{
          console.log("Error submitting Form",error)
        }
      );
    }
    }
}
