import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { signupForm } from './model/signupForm';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly baseUrl = "http://localhost:8080/PlanetWise/user";

  constructor(
    private userClient: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  addUser(userDetails: signupForm) {
    console.log('Sending user details:', userDetails);
    this.userClient.post(`${this.baseUrl}/register`, userDetails)
      .pipe(
        catchError(err => {
          this.errorHandler.errorResponse = {
            message: 'Unable to register. Please try again later.',
            status: 503,
            timestamp: new Date()
          };
          this.router.navigate(['/error']);
          return throwError(() => err); // Propagate the error
        })
      )
      .subscribe({
        next: response => {
          console.log(response);
          alert("Signup Successful. Please Login");
          this.router.navigate(['/login']);
        },
        error: error => {
          console.log(error);
        }
      });

  }
}
