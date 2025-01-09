import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})



export class GetStartedComponent {
  months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  // yearsList: number[] = [];

  constructor(private router:Router){
    // const currentYearString = sessionStorage.getItem('currentYear');
    // const currentMonthIdxString = sessionStorage.getItem('currentMonth');
    // const currentYear = currentYearString ? parseInt(currentYearString, 10) : new Date().getFullYear();
    // const currentMonthIdx = currentMonthIdxString ? parseInt(currentMonthIdxString, 10) : 0;

  

    // this.yearsList = Array.from({ length: 9 }, (_, i) => currentYear - 8 + i);
  
    
    // const currentMonth = this.months.at(currentMonthIdx);

  }

  addCurrentMonthData() {
    const currentDate = new Date();
    const currentMonth = this.months?.at(currentDate.getMonth()) || "Please Select";


    console.log(currentMonth);
    const currentYear = currentDate.getFullYear();
  
    sessionStorage.setItem('currentMonth', currentMonth.toString());
    sessionStorage.setItem('currentYear', currentYear.toString());
  
    this.router.navigate(['/waste']);
  }

}
