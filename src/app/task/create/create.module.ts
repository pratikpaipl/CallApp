import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatePage } from './create.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [CreatePage]
})
export class CreatePageModule { }
