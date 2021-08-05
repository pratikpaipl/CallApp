import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewPage } from './view.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ViewPage,
  }
];

@NgModule({
  imports: [
    SharedModule, FormsModule,
    RouterModule.forChild(routes)],
  declarations: [ViewPage]
})
export class ViewPageModule { }
