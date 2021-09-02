import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    SharedModule, FormsModule, NgSelectModule,
    RouterModule.forChild(routes)],
  declarations: [CreatePage],
   providers: [
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePageModule { }
