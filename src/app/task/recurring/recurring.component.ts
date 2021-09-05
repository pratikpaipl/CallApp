import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'recurring',
  templateUrl: './recurring.component.html',
  styleUrls: ['./recurring.component.scss'],
})
export class RecurringComponent implements OnInit {

  isRecurring: any = 'daily'

  data: any;
  startDate: any;
  day = []

  constructor(public store: StorageService, private navigation: NavigationService,public popover:PopoverController,public navParams: NavParams , public globle: GlobalProvider) {

    this.day.push({ day: 'Sun', isCheck: false })
    this.day.push({ day: 'Mon', isCheck: false })
    this.day.push({ day: 'Tue', isCheck: false })
    this.day.push({ day: 'Wed', isCheck: false })
    this.day.push({ day: 'Thu', isCheck: false })
    this.day.push({ day: 'Fri', isCheck: false })
    this.day.push({ day: 'Sat', isCheck: false })

  }

  async ngOnInit() {
    this.data = this.navParams.data;
    this.startDate=this.data.startDate;
  }

  set() {
    this.popover.dismiss({ isSub:1});
  }
  closeModal() {
    this.popover.dismiss({ isSub:0});
  }
}
