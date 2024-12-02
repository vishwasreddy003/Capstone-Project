import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { loginForm } from './model/loginForm';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:8080/PlanetWise/user";
  jwtToken?:Observable<string>;

  constructor(private todoClient:HttpClient, private router: Router) { }


  validateUser(credentials: loginForm): void {
    this.jwtToken = this.todoClient.post<string>(`${this.baseUrl}/login`, credentials);
    

    this.jwtToken.subscribe({
      next: (token: string) => {
        sessionStorage.setItem('tokenId', token); 
        console.log('Token stored successfully');
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Error during login:', err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
