import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedStateService } from '../auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submissionStatus: { message: string, type: string } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router,
    private sharedStateService: SharedStateService,
    private errorHandler:ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.validateUser(credentials).subscribe({
        next: (response) => {
          console.log('Response from backend:', response); // Debugging log
          const { jwt, username,greenCoins} = response;


          if (jwt && username && greenCoins !== undefined) {
            sessionStorage.setItem('tokenId', jwt);
            sessionStorage.setItem('username', username);
            console.log('Token and username stored successfully');
            sessionStorage.setItem('greenCoins', greenCoins.toString());
            this.sharedStateService.login(username, greenCoins);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Required data not found in response');
            this.submissionStatus = {
              message: 'Login failed. Incomplete response from server.',
              type: 'alert-error'
            };
            this.autoClearAlert();
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.handleError('Login failed. Please check your credentials.');
        }
      });
    } else {
      this.submissionStatus = {
        message: 'Please fill out all fields correctly',
        type: 'alert-error'
      };
      this.autoClearAlert();
    }
  }
  
  handleError(errorMessage: string) {
    this.errorHandler.setError(500, errorMessage);  // Set error details in the service
    this.router.navigate(['/error']);  // Navigate to the error page
  }

  private autoClearAlert(): void {
    setTimeout(() => {
      this.submissionStatus = null;  // Clear the alert after 2-3 seconds
    }, 3000); // 3000 ms = 3 seconds
  }

  clearStatus(): void {
    this.submissionStatus = null;
  }
}
