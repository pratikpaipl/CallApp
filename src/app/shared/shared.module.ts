import { PageFooterComponent } from './../widgets/page-footer/page-footer.component';
import { TopCardComponent } from './../widgets/top-card/top-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthGuard } from './authguard.service';
import { DatePipe } from '@angular/common';
import { MenuItemComponent } from '../widgets/menu-item/menu-item.component';
import { ExpandComponent } from '../widgets/expand/expand.component';
import { RecurringComponent } from '../task/recurring/recurring.component';
import { SubTaskComponent } from '../task/sub-task/sub-task.component';
import { NoTaskComponent } from '../widgets/no-task/no-task.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateComponent } from '../home/create/create.component';

@NgModule({
  declarations: [MenuItemComponent, TopCardComponent, PageFooterComponent, NoTaskComponent,CreateComponent, RecurringComponent, SubTaskComponent, ExpandComponent],
  imports: [CommonModule, IonicModule, FormsModule,NgSelectModule, ReactiveFormsModule],
  exports: [CommonModule, IonicModule, TopCardComponent, PageFooterComponent, ReactiveFormsModule, MenuItemComponent, NoTaskComponent,CreateComponent, RecurringComponent, SubTaskComponent, ExpandComponent],  providers: [AuthGuard, DatePipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
