import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LoginComponent } from './presentation/login/login.component';
import { RegisterComponent } from './presentation/register/register.component';
import { AuthState } from './application/store/auth.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: true // impornt envs
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    })
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthState]
})
export class AuthModule {}
