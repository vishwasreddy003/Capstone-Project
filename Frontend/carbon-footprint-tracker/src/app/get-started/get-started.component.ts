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

  constructor(private router:Router){

  }

  addCurrentMonthData(){
    this.router.navigate(['/waste']);
  }

  

}
