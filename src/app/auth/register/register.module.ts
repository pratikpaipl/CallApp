import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
