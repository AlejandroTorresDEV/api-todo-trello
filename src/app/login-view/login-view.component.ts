import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  username: string;
  password: string;
  errorLogin : boolean;
  errorForm : boolean;
  loanding: boolean;
  error: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loanding = false;
  }

  loginUser(){  
    const { username, password } = this;
    this.loanding = true;
    if (username !== undefined && password !== undefined 
      || username !== null  && password !== null) {
      this.authService
        .loginUser(username, password)
        .then(() => {
          this.error = undefined;
          this.router.navigate(['/board']);
        })
        .catch(error => {
          this.loanding = false;
          this.errorLogin = true;
          this.error = error;
        });
    }else{
      this.errorForm = true;
    }
  }

}
