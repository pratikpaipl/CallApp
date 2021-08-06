import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [LoginPage]
})
export class LoginPageModule { }
