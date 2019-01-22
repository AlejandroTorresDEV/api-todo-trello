import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { AuthGuard } from "./auth.guard";
import { RedirectGuard } from "./redirect.guard";

const routes: Routes = [
  {
    path: 'board',
    component: BoardComponent , canActivate : [AuthGuard],
  },
  {
    path: 'login',
    component: LoginViewComponent, canActivate: [RedirectGuard],
  },
  {
    path: 'register',
    component: RegisterViewComponent,canActivate: [RedirectGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
