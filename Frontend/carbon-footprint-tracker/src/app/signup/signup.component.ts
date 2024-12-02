import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  frequencies: string[] = ['Daily', 'Weekly', 'Monthly'];  // Array for reminder frequencies

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // added email validation
      age: ['', [Validators.required, Validators.min(18)]],  // age validation
      reminderFrequency: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // password validation
      confirmPassword: ['', Validators.required]
    });
  }

  signupUser(): void {
    if (this.signupForm.valid) {
      const userDetails = this.signupForm.value;
      this.signupService.addUser(userDetails);
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
