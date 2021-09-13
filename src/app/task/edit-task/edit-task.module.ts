import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  EditTaskPage } from './edit-task.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: EditTaskPage
  },
];

@NgModule({
  declarations: [EditTaskPage],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditTaskPageModule { }