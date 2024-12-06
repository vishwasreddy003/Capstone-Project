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
  yearsList: number[] = [];


  transportForm : FormGroup = new FormGroup({})

  constructor(private formBuilder:FormBuilder,private trackerApiService:TrackerApiService,private router:Router){}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.yearsList = Array.from({length: 11}, (_, i) => currentYear - 5 + i);
    this.transportForm = this.formBuilder.group({
      transportation_mode:['',Validators.required],
      year : ['',Validators.required],
      fuel_type: ['',Validators.required],
      distance_km:['',Validators.required],
      frequency:['',Validators.required],
      month:['',Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transportForm.valid) {
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        (response) => {
          alert('Form submitted successfully');
          this.resetForm(); // Reset the form after successful submission
        },
        (error) => {
          console.log('Error submitting form', error);
        }
      );
    }
    }
    resetForm(): void {
      this.transportForm.reset();
    }
  
    // Navigate to the energy page
    goToEnergyPage(): void {
      if (this.transportForm.valid) {
        const transportData = this.transportForm.value;
        this.trackerApiService.submitTransportData(transportData).subscribe(
          (response) => {
            alert('Form submitted successfully');
            this.resetForm(); 
            this.router.navigate(['/energy']);
          },
          (error) => {
            console.log('Error submitting form', error);
          }
        );
      }
    }
}
