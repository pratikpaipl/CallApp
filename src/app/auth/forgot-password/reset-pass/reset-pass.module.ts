import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResetPasswordPage } from './reset-pass.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule { }
