import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import * as moment from 'moment-timezone';
@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
 
  govDueDates=[];
  tasks=[];

  @Input()
  selectedDate: any;

   days = [];
   date = moment();
   weekNo = Math.ceil(this.date.date() / 7);

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(public store: StorageService, private calendar: Calendar, private navigation: NavigationService, public global: GlobalProvider) {
    this.govDueDates.push({lbl:'Tax Manager',value:'Last Date for 1st installment of Advance Tax',isCheck:false})
    this.govDueDates.push({lbl:'Enable GST 2.0',value:'New relaxations on GSTR6A dates release today and will applicable from Sept 2021',isCheck:true})
  
    this.tasks.push({task:'File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai',date:'22nd july 2021',subtask:[{task:'Upload the Respective Trade Name Sale Register,',date:'20th july 2021'},{task:'Save to GSTIN & Get approval on the respective records',date:'21th july 2021'}]});
    // this.tasks.push({task:'File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai',date:'22nd july 2021',subtask:[{task:'Upload the Respective Trade Name Sale Register,',date:'20th july 2021'},{task:'Save to GSTIN & Get approval on the respective records',date:'21th july 2021'}]});
  }
  deleteEvent(ev) {

  }

  async ngOnInit() {
    this.date = moment(this.selectedDate);
    this.weekNo = Math.ceil(this.date.date() / 7);
    this.getWeeks(this.date);
  }
  nextWeek()
  {
    this.date.add(1, 'weeks');
    this.getWeeks(this.date);
  }
  previousWeek()
  {
    this.date.subtract(1,'weeks');
    this.getWeeks(this.date);
  }
  public getWeeks(currentDate)
  {
    this.days=[];
    this.weekNo = Math.ceil(this.date.date() / 7);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
    const today = moment().format("DD-MM");
    for (var i = 0; i <= 6; i++) {
      const day = moment(weekStart).add(i, 'days').format("DD")
      const dayMonth = moment(weekStart).add(i, 'days').format("DD-MM")
        // console.log(' day ==>  ',day);
        const isCurrent = (dayMonth == today);
          // this.days.push(moment(weekStart).add(i, 'days').format("ddd[\r\n]DD"));
          this.days.push({day:day,lbl:moment(weekStart).add(i, 'days').format("ddd"),isCurrent:isCurrent});
      };
      console.log('days',this.days);
  }
  
  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
