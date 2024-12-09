import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SharedStateService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  greenCoins: number = 0;

  constructor(private sharedStateService: SharedStateService, private router:Router) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.sharedStateService.getLoginStatus$().subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.sharedStateService.getUsername$().subscribe((username) => {
      this.username = username;
    });

    this.sharedStateService.getGreenCoins$().subscribe((coins) => {
      this.greenCoins = coins;
    });
  }

  logout(): void {
    this.sharedStateService.logout(); 
    this.router.navigate(['/home']);
  }


  
}



