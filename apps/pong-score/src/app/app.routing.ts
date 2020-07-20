import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/application/auth.guard';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/domain/auth.module').then(m => m.AuthModule)
}, {
  path: 'dashboard',
  loadChildren: () => import('./dashboard/domain/dashboard.module').then(m => m.DashboardModule),
  canActivate: [AuthGuard]
}, {
  path: 'comments',
  loadChildren: () => import('./comments/comments.module').then(m => m.CommentsPageModule),
  canActivate: [AuthGuard]
}, {
  path: '', redirectTo: 'auth', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
