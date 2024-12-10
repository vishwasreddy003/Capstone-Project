import { Injectable } from '@angular/core';
import { ErrorResponse } from './model/ErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorResponse: ErrorResponse = {
    status: 0,
    message: 'An unknown error occurred.',
    timestamp: new Date(),
  };

  // Set error details when an error occurs
  setError(status: number, message: string): void {
    this.errorResponse = {
      status,
      message,
      timestamp: new Date(),
    };
  }

  // Reset error details
  resetError(): void {
    this.errorResponse = {
      status: 0,
      message: 'An unknown error occurred.',
      timestamp: new Date(),
    };
  }
}
