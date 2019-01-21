import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt: string = localStorage.getItem('jwt');

  constructor(private http: HttpClient,private router:Router) { }

  loginUser(username, password) : any{
    const body = { username, password };

    return new Promise((resolve, reject) => {
      this.http
        .post('https://apitrello.herokuapp.com/users/login', body)
        .toPromise()
        .then(() => {
          reject('User not found');
        })
        .catch(maybeNotAndError => {
          if (maybeNotAndError.status === 200) {
            const jwt = maybeNotAndError.error.text;
            this.jwt = jwt;
            localStorage.setItem('jwt', jwt);
            resolve(200);
          } else if (maybeNotAndError.status === 401) {
            reject('Wrong password');
          } else {
            reject('Try again');
          }
        });
    });
  }

  getLists(): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.get('https://apitrello.herokuapp.com/list', options).toPromise();
  }

  getTasks(idlist: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return new Promise((resolve, reject) => {
      this.http
        .get('https://apitrello.herokuapp.com/list/tasks/' + idlist, options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }

  registerUser(username: string, password: string) {
    const body = { username, password };
    return this.http.post('https://apitrello.herokuapp.com/users', body).toPromise();
  }

}
