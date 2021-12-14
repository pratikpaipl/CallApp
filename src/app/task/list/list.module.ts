import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ListPage } from './list.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskListItemComponent } from 'src/app/widgets/task-list-item/task-list-item.component';
const routes: Routes = [
  {
    path: '',
    component: ListPage
  },
];

@NgModule({
  declarations: [ListPage, TaskListItemComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [TaskListItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPageModule { }