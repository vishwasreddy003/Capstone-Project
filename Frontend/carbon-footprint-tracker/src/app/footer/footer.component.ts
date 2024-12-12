import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedStateService } from '../auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isLoggedIn: boolean = false;
  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    this.sharedStateService.getLoginStatus$().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

}
