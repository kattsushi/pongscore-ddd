import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../presentation/auth/auth.component';
import { ResetPasswordComponent } from '../presentation/reset-password/reset-password.component';

const routes: Routes = [{
  path: 'login',
  component: AuthComponent,
},{
  path: 'reset-password/:passwordToken',
  component: ResetPasswordComponent
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}];
/**
 * Routing Auth Ng module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
