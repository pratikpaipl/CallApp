import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangePasswordPage } from './change-pass.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule { }
