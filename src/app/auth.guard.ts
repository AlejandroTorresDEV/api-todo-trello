import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: AuthService, private router: Router) { }

  canActivate(){
    if (this.apiService.getToken()) {
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
