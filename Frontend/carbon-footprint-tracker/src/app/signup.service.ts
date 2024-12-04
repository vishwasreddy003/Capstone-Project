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
  ) {}

  addUser(userDetails: signupForm): Observable<any> {
    console.log('Sending user details:', userDetails);
    return this.userClient.post(`${this.baseUrl}/register`, userDetails)
      .pipe(
        catchError(err => {
          this.errorHandler.errorResponse = {
            message: 'Unable to register. Please try again later.',
            status: 503,
            timestamp: new Date()
          };

          this.router.navigate(['/error']); 
          return throwError(() => err); 
        })
      );
  }
}
