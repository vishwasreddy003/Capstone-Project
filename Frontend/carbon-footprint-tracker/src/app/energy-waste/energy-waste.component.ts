import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { TrackerApiService } from '../tracker-api.service';

@Component({
  selector: 'app-energy-waste',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './energy-waste.component.html',
  styleUrl: './energy-waste.component.css'
})
export class EnergyWasteComponent implements OnInit {
  months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  constructor(
    private formBuiler: FormBuilder,
    private trackerApiService: TrackerApiService,
    private router: Router,
  ) {}

  energyWasteForm: FormGroup = new FormGroup({});
  yearsList: number[] = [];
  submissionStatus: { message: string, type: string } | null = null;

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.yearsList = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    this.energyWasteForm = this.formBuiler.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      electricity_units: ['', [Validators.required, Validators.min(0)]],
      no_of_gas_cylinders: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.energyWasteForm.valid) {
      const energyData = this.energyWasteForm.value;
      const greenScore = {
        year: this.energyWasteForm.get('year')?.value,
        month: this.energyWasteForm.get('month')?.value
      };
      console.log(greenScore);
      
      this.trackerApiService.submitEnergyData(energyData).subscribe(
        response => {
          this.submissionStatus = {
            message: "Form submitted successfully",
            type: "alert-success"  
          };
          this.autoClearAlert();
          this.router.navigate(['/dashboard']);
          this.trackerApiService.getGreenScores(greenScore).subscribe(
            response => {
              console.log("Green score calculated", response);
            },
            error => {
              this.submissionStatus = {
                message: "Error submitting form",
                type: "alert-error"  
              };
              this.autoClearAlert();
              console.log("Error calculating green score", error);
            }
          );
        },
        error => {
          this.submissionStatus = {
            message: "Error submitting form",
            type: "alert-error"  
          };
          this.autoClearAlert();
          console.log("Error submitting form", error);
        }
      );
    }
  }
  private autoClearAlert(): void {
    setTimeout(() => {
      this.submissionStatus = null;  
    }, 3000);
  }

  clearStatus(): void {
    this.submissionStatus = null;
  }
}
