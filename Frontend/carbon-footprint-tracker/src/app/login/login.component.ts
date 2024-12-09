import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedStateService } from '../auth.service';
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
    private loginService: LoginService,
    private router:Router,
    private sharedStateService: SharedStateService
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
            alert('Login failed. Incomplete response from server.');
          }
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
