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
  error: any;
  valid: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  registerNewUser(){
    console.log("hola");
    const { username, password } = this;
    if (username !== undefined && password !== undefined) {
      this.authService
        .registerUser(username.trim(), password.trim())
        .then(res => {
          console.log("quisme");
          this.validForm = true;
          this.userCreated = true;
          this.valid = res;
        })
        .catch(error => {
          this.error = error;
        });
    }else{
      this.validForm = false;
    }
  }
}
