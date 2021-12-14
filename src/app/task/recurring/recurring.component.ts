import { element } from 'protractor';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
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
  selectedMonth: any = '1'
  selectedYear: any = '1'

  data: any;
  startDate: any;
  recurringData: any;
  day = []

  constructor(public store: StorageService, private navigation: NavigationService,public popover:PopoverController,public navParams: NavParams , public globle: GlobalProvider) {


    const today = moment().format("ddd")
    // for (var i = 0; i <= 6; i++) {
    //   const day = moment().add(i, 'days').format("ddd")
    //   const isCurrent = (day == today);
    //   this.day.push({ day: day, isCheck: isCurrent });
    // };
    
    this.day.push({ day: 'Sun', isCheck: ('Sun' == today) })
    this.day.push({ day: 'Mon', isCheck: ('Mon' == today) })
    this.day.push({ day: 'Tue', isCheck: ('Tue' == today) })
    this.day.push({ day: 'Wed', isCheck: ('Wed' == today) })
    this.day.push({ day: 'Thu', isCheck: ('Thu' == today) })
    this.day.push({ day: 'Fri', isCheck: ('Fri' == today) })
    this.day.push({ day: 'Sat', isCheck: ('Sat' == today) })

    // for (var i = 0; i <= this.day.length; i++) {
    //   const element = this.day[i]
    //   const isCurrent = (element.day == today);
    //   this.day[i].isCheck=isCurrent;
    // };
  }

  async ngOnInit() {
    this.data = this.navParams.data;
    this.startDate=this.data.startDate;
    this.recurringData=this.data.recurringData;
    if(this.recurringData !=undefined){
      this.isRecurring= this.recurringData.recurring_type
    }
  }

  set() {
    let days = [];
    let data:any={recurring_type:'',weekly_days:'',repeate_month:'',repeate_year:''};
    data.recurring_type=this.isRecurring
    if(this.isRecurring == 'daily'){
    }else if(this.isRecurring == 'weekly'){
      days=[]
      for (let i = 0; i < this.day.length; i++) {
        const element = this.day[i];
        if (element.isCheck != undefined && element.isCheck) {
          days.push(element.day)
        }
      }
      data.weekly_days=days
      if(days.length ==0){
        this.globle.showToast('Please at least one day ',1500);
        return
      }
    }else if(this.isRecurring == 'monthly'){
      data.repeate_month=this.selectedMonth
      
    }else if(this.isRecurring == 'yearly'){
      data.repeate_year=this.selectedYear
    }
    
    this.popover.dismiss({ isSub:1,data:data});
  }
  closeModal() {
    this.popover.dismiss({ isSub:0});
  }
}
