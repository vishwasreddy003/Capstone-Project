import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedStateService } from '../auth.service';
import { TrackerApiService } from '../tracker-api.service';


@Component({
  selector: 'app-waste-production',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './waste-production.component.html',
  styleUrl: './waste-production.component.css'
})
export class WasteProductionComponent implements OnInit {

  months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  wasteTypes: string[] = ['FOODWASTE', 'NONFOODWASTE'];

  wasteProdForm: FormGroup = new FormGroup({})
  yearsList: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private trackerApiService: TrackerApiService,
    private router: Router,
    private sharedStateService: SharedStateService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.yearsList = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    this.wasteProdForm = this.formBuilder.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      waste_type: ['', Validators.required],
      quantity_kgs: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.wasteProdForm.valid) {
      const wasteProdData = this.wasteProdForm.value;
      this.trackerApiService.submitWasteProdData(wasteProdData).subscribe(
        response => {
          alert("Form submitted successfully");
          this.resetForm();
        },
        error => {
          console.log("Error submitting Form", error);
        }
      );
    }
  }

  onMonthChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.sharedStateService.setSelectedMonth(selectedValue);
  }



  onYearChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.sharedStateService.setSelectedYear(selectedValue);
  }



  resetForm(): void {
    this.wasteProdForm.reset();
  }

  submitData():void{
    if (this.wasteProdForm.valid) {
      const wasteProdData = this.wasteProdForm.value;
      this.trackerApiService.submitWasteProdData(wasteProdData).subscribe(
        (response) => {
          alert('Form submitted successfully');
          this.resetForm();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('Error submitting form', error);
        }
      );
    }
  }


  goToTransportPage(): void {
    if (this.wasteProdForm.valid) {
      const wasteProdData = this.wasteProdForm.value;
      this.trackerApiService.submitWasteProdData(wasteProdData).subscribe(
        (response) => {
          alert('Form submitted successfully');
          this.resetForm();
          this.router.navigate(['/transport']);
        },
        (error) => {
          console.log('Error submitting form', error);
        }
      );
    }
  }
}












