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

@NgModule({
  declarations: [ MenuItemComponent, TopCardComponent,PageFooterComponent,ExpandComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, IonicModule, TopCardComponent,PageFooterComponent, ReactiveFormsModule,MenuItemComponent,ExpandComponent ],
  providers: [AuthGuard, DatePipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
