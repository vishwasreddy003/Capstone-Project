import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { response } from 'express';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  frequencies: string[] = ['DAILY', 'WEEKLY', 'MONTHLY'];  

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private router:Router,
    private userClient:HttpClient
  ) {}

  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      age: ['', [Validators.required, Validators.min(18)]],  
      reminderFrequency: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  async signupUser() {
    if (this.signupForm.valid) {
      const userDetails = this.signupForm.value;
      this.signupService.addUser(userDetails);
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
