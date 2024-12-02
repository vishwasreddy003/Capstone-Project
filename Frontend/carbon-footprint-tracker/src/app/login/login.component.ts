import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
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

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
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
        next: (token: string) => {
          sessionStorage.setItem('tokenId', token);
          console.log('Token stored successfully');
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
