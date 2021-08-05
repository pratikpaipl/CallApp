import { PageFooterComponent } from './../widgets/page-footer/page-footer.component';
import { TopCardComponent } from './../widgets/top-card/top-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthGuard } from './authguard.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [TopCardComponent, PageFooterComponent,],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, IonicModule, TopCardComponent, PageFooterComponent, ReactiveFormsModule,],
  providers: [AuthGuard, DatePipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
