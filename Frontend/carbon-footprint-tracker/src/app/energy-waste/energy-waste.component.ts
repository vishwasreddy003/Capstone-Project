import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-energy-waste',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './energy-waste.component.html',
  styleUrl: './energy-waste.component.css'
})
export class EnergyWasteComponent {
 months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 month?: string;
 electricityUnits?: number;
 noOfGasCylinders?: number;
}
