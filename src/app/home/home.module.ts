import { CreateComponent } from './create/create.component';
import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationItemComponent } from '../widgets/notification-item/notification-item.component';
import { TaskItemComponent } from '../widgets/task-item/task-item.component';
import { WeekComponent } from './calender/week/week.component';
import { MonthComponent } from './calender/month/month.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
];

@NgModule({
  declarations: [HomePage, DashboardComponent, MonthComponent,WeekComponent, NotificationComponent, SettingsComponent,TaskItemComponent,NotificationItemComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [DashboardComponent, MonthComponent,WeekComponent, NotificationComponent, SettingsComponent,TaskItemComponent,NotificationItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }