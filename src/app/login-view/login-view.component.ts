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
  error: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  loginUser(){  
    const { username, password } = this;
    if (username !== undefined && password !== undefined) {
      this.authService
        .loginUser(username.trim(), password.trim())
        .then(() => {
          this.error = undefined;
          this.router.navigate(['/board']);
        })
        .catch(error => {
           this.errorLogin = true;
          this.error = error;
        });
    }
  }

}
