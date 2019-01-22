import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    
    if (this.authService.getToken()) {
      this.router.navigate(['/board']);
      return false;
    }else{
      return true;
    }
  }
}
