import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

  constructor(private router:Router){

  }

  addMonthlyData(){
    this.router.navigate(['/waste']);
  }

  addCertainMonthData(){
    
  }

}
