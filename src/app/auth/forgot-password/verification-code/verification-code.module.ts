import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VerificationCodePage } from './verification-code.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: VerificationCodePage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [VerificationCodePage]
})
export class VerificationCodePageModule { }
