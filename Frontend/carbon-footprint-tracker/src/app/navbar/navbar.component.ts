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

  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.sharedStateService.getLoginStatus$().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.sharedStateService.logout(); // Log out the user
  }
}
