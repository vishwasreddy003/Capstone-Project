import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waste-production',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './waste-production.component.html',
  styleUrl: './waste-production.component.css'
})
export class WasteProductionComponent {

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedMonth: string = '';

  wasteTypes: string[] = [
    'FOODWASTE','NONFOODWASTE'
  ];




}
