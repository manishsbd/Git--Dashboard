import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  loginArray: any ={
    email:'',
    password:''

  };
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}



  onlogin() {
    this.authService.setIsAuth(true);
    localStorage.setItem('loginData', JSON.stringify(this.loginArray));
    this.router.navigate(['/dashboard']);
  }


  }
    
