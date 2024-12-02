import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormBuilder,Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { loginForm } from '../model/loginForm';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private loginService:LoginService){}
  
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  loginUser(credentials:loginForm){if(this.loginForm.valid)
    this.loginService.validateUser(credentials);
  }



  

}
