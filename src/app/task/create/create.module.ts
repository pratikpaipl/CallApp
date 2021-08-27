import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatePage } from './create.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { UserService } from 'src/app/services/user.service';

const routes: Routes = [
  {
    path: '',
    component: CreatePage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule, AutoCompleteModule,
    RouterModule.forChild(routes)],
  declarations: [CreatePage],
   providers: [
    UserService
  ]
})
export class CreatePageModule { }
