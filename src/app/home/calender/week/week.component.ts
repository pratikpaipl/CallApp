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

  
  // moments = extendMoment(moment);
   datevalue:any;
   days = [];
   date = moment();
   weekno = Math.ceil(this.date.date() / 7);

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private calendar: Calendar, private navigation: NavigationService, public globle: GlobalProvider) {
  }
  addEvent() {
    // this.router.navigateByUrl('/add-event');
    // this.navCtrl.push(AddEventPage);
  }
  deleteEvent(ev) {

  }
  // loadEventThisMonth() {
  //   this.eventList = new Array();
  //   var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  //   var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  //   this.calendar.listEventsInRange(startDate, endDate).then(
  //     (msg) => {
  //       msg.forEach(item => {
  //         this.eventList.push(item);
  //       });
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  // goToLastMonth() {
  //   this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  //   this.getDaysOfMonth();
  // }
  // goToNextMonth() {
  //   this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
  //   this.getDaysOfMonth();
  // }
  // getDaysOfMonth() {
  //   this.daysInThisMonth = new Array();
  //   this.daysInLastMonth = new Array();
  //   this.daysInNextMonth = new Array();
  //   this.currentMonth = this.monthNames[this.date.getMonth()];
  //   this.currentYear = this.date.getFullYear();
  //   if (this.date.getMonth() === new Date().getMonth()) {
  //     this.currentDate = new Date().getDate();
  //   } else {
  //     this.currentDate = 999;
  //   }

  //   var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  //   var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
  //   for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
  //     this.daysInLastMonth.push(i);
  //   }

  //   var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  //   for (var i = 0; i < thisNumOfDays; i++) {
  //     this.daysInThisMonth.push(i + 1);
  //   }

  //   var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
  //   var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
  //   for (var i = 0; i < (6 - lastDayThisMonth); i++) {
  //     this.daysInNextMonth.push(i + 1);
  //   }
  //   var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
  //   if (totalDays < 31) {
  //     for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
  //       this.daysInNextMonth.push(i);
  //     }
  //   }
  // }
  // checkEvent(day) {
  //   var hasEvent = false;
  //   var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
  //   var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
  //   this.eventList.forEach(event => {
  //     if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
  //       hasEvent = true;
  //     }
  //   });
  //   return hasEvent;
  // }
  // selectDate(day) {
  //   this.isSelected = false;
  //   this.selectedEvent = new Array();
  //   var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
  //   var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
  //   this.eventList.forEach(event => {
  //     if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
  //       this.isSelected = true;
  //       this.selectedEvent.push(event);
  //     }
  //   });
  // }

  async ngOnInit() {
    this.getweeks(this.date);
  }
  nextweek()
  {
    this.date.add(1, 'weeks');
    this.getweeks(this.date);
    console.log('Week No:'+Math.ceil(this.date.date() / 7) );
  }
  previousweek()
  {
    this.date.subtract(1,'weeks');
    this.getweeks(this.date);
  }
  public getweeks(currentDate)
  {
    //var currentDate = moment();

    // console.log(' currentDate ',currentDate);
    this.days=[];
    this.weekno = Math.ceil(this.date.date() / 7);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
    const today = moment().format("DD-MM");
    for (var i = 0; i <= 6; i++) {
      const day = moment(weekStart).add(i, 'days').format("DD")
      const dayMonth = moment(weekStart).add(i, 'days').format("DD-MM")
        console.log(' day ==>  ',day);
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
