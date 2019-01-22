import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit{
  username: string;
  password: string;
  validForm : boolean = true;
  userCreated : boolean = false;
  loanding: boolean;
  error: any;
  valid: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerNewUser(){
    const { username, password } = this;
    this.loanding = true;
    if (username !== undefined && password !== undefined) {
      this.authService
        .registerUser(username.trim(), password.trim())
        .then(res => {
          this.loanding = false;
          this.validForm = true;
          this.userCreated = true;
          this.valid = res;
        })
        .catch(error => {
          this.loanding = false;
          this.error = error;
        });
    }else{
      this.validForm = false;
    }
  }
}
