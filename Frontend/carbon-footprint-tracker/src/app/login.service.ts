import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { loginForm } from './model/loginForm';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = "http://localhost:8080/PlanetWise/user";

  constructor(
    private userClient: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  // Return the observable so the component can subscribe
  validateUser(credentials: loginForm): Observable<{ jwt: string; username: string , greenCoins:number}> {
    return this.userClient.post<{ jwt: string; username: string,greenCoins:number }>(`${this.baseUrl}/login`, credentials)
      .pipe(
        catchError(err => {
          this.errorHandler.errorResponse = {
            message: 'Unable to connect to the server',
            status: 503,
            timestamp: new Date()
          };
          this.router.navigate(['/error']);
          return throwError(() => err);
        })
      );
  }
  
}
