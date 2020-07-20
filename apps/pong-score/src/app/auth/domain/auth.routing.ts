import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../presentation/auth/auth.component';

const routes: Routes = [{
  path: 'login',
  component: AuthComponent,
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
