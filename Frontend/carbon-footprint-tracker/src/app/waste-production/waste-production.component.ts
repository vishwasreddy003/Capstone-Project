import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedStateService } from '../auth.service';
import { ErrorHandlerService } from '../error-handler.service';
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
  submissionStatus: { message: string, type: string } | null = null;


  constructor(private formBuilder: FormBuilder,
    private trackerApiService: TrackerApiService,
    private router: Router,
    private sharedStateService: SharedStateService,private errorHandler:ErrorHandlerService) { }

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
        (response) => {
          this.submissionStatus = {
            message: 'Form submitted successfully',
            type: 'alert-success'
          };
          this.autoClearAlert();
          this.resetForm();
        },
        (error) => {
          this.submissionStatus = {
            message: 'Error submitting Form',
            type: 'alert-error'
          };
          this.autoClearAlert();
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
          this.submissionStatus = {
            message: 'Form submitted successfully',
            type: 'alert-success'
          };
          this.autoClearAlert();
          this.resetForm();
          this.router.navigate(['/dashboard']);
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

  goToTransportPage(): void {
    if (this.wasteProdForm.valid) {
      const wasteProdData = this.wasteProdForm.value;
      this.trackerApiService.submitWasteProdData(wasteProdData).subscribe(
        (response) => {
          this.submissionStatus = {
            message: 'Form submitted successfully',
            type: 'alert-success'
          };
          this.autoClearAlert();
          this.resetForm();
          this.router.navigate(['/transport']);
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
      this.submissionStatus = null;  // Clear the alert after 3 seconds
    }, 3000); // 3000 ms = 3 seconds
  }
  
  clearStatus(): void {
    this.submissionStatus = null;
  }
  
}












