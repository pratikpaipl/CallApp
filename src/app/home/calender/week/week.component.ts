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
  @Input()
  selectedDate: any;
  days = [];
  date: any = moment();
  weekno: any = Math.ceil(this.date.date() / 7);
  // date = moment();
  // weekno = Math.ceil(this.date.date() / 7);

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private calendar: Calendar, private navigation: NavigationService, public globle: GlobalProvider) {


    console.log('Date ', this.date.date());

  }
  addEvent() {
    // this.router.navigateByUrl('/add-event');
    // this.navCtrl.push(AddEventPage);
  }
  deleteEvent(ev) {

  }

  async ngOnInit() {
    this.date = moment(this.selectedDate);
    this.weekno = Math.ceil(this.date.date() / 7);

    console.log('Date 11', this.date);
    this.getweeks(this.date);
  }
  nextweek() {
    this.date.add(1, 'weeks');
    this.getweeks(this.date);
    console.log('Week No:' + Math.ceil(this.date.date() / 7));
  }
  previousweek() {
    this.date.subtract(1, 'weeks');
    this.getweeks(this.date);
  }
  public getweeks(currentDate) {
    //var currentDate = moment();

    // console.log(' currentDate ',currentDate);
    this.days = [];
    this.weekno = Math.ceil(this.date.date() / 7);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
    const today = moment().format("DD-MM");
    for (var i = 0; i <= 6; i++) {
      const day = moment(weekStart).add(i, 'days').format("DD")
      const dayMonth = moment(weekStart).add(i, 'days').format("DD-MM")
      console.log(' day ==>  ', day);
      const isCurrent = (dayMonth == today);
      // this.days.push(moment(weekStart).add(i, 'days').format("ddd[\r\n]DD"));
      this.days.push({ day: day, lbl: moment(weekStart).add(i, 'days').format("ddd"), isCurrent: isCurrent });
    };
    console.log('days', this.days);
  }

  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
