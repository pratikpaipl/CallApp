import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ProfilePage } from './profile.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
];

@NgModule({
  declarations: [ProfilePage],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePageModule { }