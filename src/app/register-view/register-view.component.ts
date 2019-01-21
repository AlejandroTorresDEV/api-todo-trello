import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {
  username: string;
  password: string;
  error: any;
  valid: any;

  constructor(private authService: AuthService) { }


  registerNewUser(){
    console.log("hola");
    const { username, password } = this;
    if (username.trim() !== '' && password.trim() !== '') {
      this.authService
        .registerUser(username.trim(), password.trim())
        .then(res => {
          this.valid = res;
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
}
