import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  constructor(public errorHandler:ErrorHandlerService){}
}
