import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuItemComponent } from '../widgets/menu-item/menu-item.component';
import { NotificationItemComponent } from '../widgets/notification-item/notification-item.component';
import { TaskItemComponent } from '../widgets/task-item/task-item.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
];

@NgModule({
  declarations: [HomePage, DashboardComponent, CalenderComponent, NotificationComponent, SettingsComponent,TaskItemComponent,NotificationItemComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [DashboardComponent, CalenderComponent, NotificationComponent, SettingsComponent,TaskItemComponent,NotificationItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }