import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  NotificationSettingsPage } from './notification-settings.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskListItemComponent } from 'src/app/widgets/task-list-item/task-list-item.component';
const routes: Routes = [
  {
    path: '',
    component: NotificationSettingsPage
  },
];

@NgModule({
  declarations: [NotificationSettingsPage],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationSettingsPageModule { }