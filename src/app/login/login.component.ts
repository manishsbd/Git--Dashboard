import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginArray: any ={
    email:'',
    password:'',
    token:''

  };
  constructor(private router: Router, private authService: AuthService) {}



  onlogin() {
    this.authService.setIsAuth(true);
    localStorage.setItem('loginData', JSON.stringify(this.loginArray));
    this.router.navigate(['/dashboard']);
  }


  }
    
