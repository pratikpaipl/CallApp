import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CalenderComponent } from './calender/calender.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
];

@NgModule({
  declarations: [HomePage, DashbordComponent, CalenderComponent, NotificationComponent, SettingsComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [DashbordComponent, CalenderComponent, NotificationComponent, SettingsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }