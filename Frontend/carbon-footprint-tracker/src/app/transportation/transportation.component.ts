import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transportation.component.html',
  styleUrl: './transportation.component.css'
})
export class TransportationComponent implements OnInit {

  transportationModes: string[] = ['BIKE', 'CAR', 'BUS', 'TRAIN', 'FLIGHT', 'AUTO'];
  fuelTypes: string[] = ['DIESEL', 'EV', 'PETROL', 'JET_FUEL'];
  frequencies: string[] = ['DAILY', 'WEEKLY', 'MONTHLY'];  // Frequency as an array
  months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  yearsList: number[] = [];
  submissionStatus: { message: string, type: string } | null = null;


  transportForm: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private trackerApiService: TrackerApiService, private router: Router,private errorHandler :ErrorHandlerService) { }

  ngOnInit(): void {
    const currentYearString = sessionStorage.getItem('currentYear');
    const currentMonthIdxString = sessionStorage.getItem('currentMonth');
    const currentYear = currentYearString ? parseInt(currentYearString, 10) : new Date().getFullYear();
    const currentMonthIdx = currentMonthIdxString ? parseInt(currentMonthIdxString, 10) : 0;
    const currentMonth = this.months.at(currentMonthIdx);

    this.yearsList = Array.from({ length: 9 }, (_, i) => currentYear - 8 + i);
    this.transportForm = this.formBuilder.group({
      transportation_mode: ['', Validators.required],
      year: ['', Validators.required],
      fuel_type: ['', Validators.required],
      distance_km: ['', Validators.required],
      frequency: ['', Validators.required],
      month: ['', Validators.required]
    });

    if (currentMonth && currentYear) {
      this.transportForm.patchValue({
        month: currentMonth,
        year: currentYear,
      });
    }
  }

  onSubmit(): void {
    if (this.transportForm.valid) {
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        (response) => {
          this.submissionStatus = {
            message: "Form submitted successfully",
            type: "alert-success"
          };
          this.autoClearAlert();
          this.resetForm(); // Reset the form after successful submission
        },
        (error) => {
          this.submissionStatus = {
            message: "Error submitting form",
            type: "alert-error"
        };
        this.autoClearAlert();
      }
      );
    }
  }
  resetForm(): void {
    this.transportForm.reset();
  }

  submitData():void{
    if (this.transportForm.valid) {
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        (response) => {
          this.submissionStatus = {
            message: "Form submitted successfully",
            type: "alert-success"
          };
          this.autoClearAlert();
          this.resetForm();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.submissionStatus = {
            message: "Error submitting form",
            type: "alert-error"
          };
          this.autoClearAlert();
        }
      );
    }
  }

  // Navigate to the energy page
  goToEnergyPage(): void {
    if (this.transportForm.valid) {
      const transportData = this.transportForm.value;
      this.trackerApiService.submitTransportData(transportData).subscribe(
        (response) => {
          this.submissionStatus = {
            message: 'Form submitted successfully',
            type: 'alert-success'
          };
          this.autoClearAlert();
          this.resetForm();
          this.router.navigate(['/energy']);
        },
        (error) => {
         this.submissionStatus={
           message: 'Error submitting Form',
           type:'alert-error'
         };
         this.autoClearAlert();
        }
      );
    }
  }

  private autoClearAlert(): void {
    setTimeout(() => {
      this.submissionStatus = null;  // Clear the alert after 2-3 seconds
    }, 3000); // 3000 ms = 3 seconds
  }

  clearStatus(): void {
    this.submissionStatus = null;
  }
}
