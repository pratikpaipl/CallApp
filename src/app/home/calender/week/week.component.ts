import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  eventList: any = []
  govDueDates = [];
  upcomingDate: any;
  tasks = [];
  assiedToYou = [];
  assiedByYou = [];
  selectedTaskTab = 'toyou'

  selMonthYear:any;

  @Input()
  selectedDate: any;

  days = [];
  date = moment();
  cDate = moment();
  weekNo = Math.ceil(this.date.date() / 7);

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(public store: StorageService, private apiService: ApiService, private calendar: Calendar, private navigation: NavigationService, public global: GlobalProvider) {
    // this.govDueDates.push({ lbl: 'Tax Manager', value: 'Last Date for 1st installment of Advance Tax', isCheck: false })
    // this.govDueDates.push({ lbl: 'Enable GST 2.0', value: 'New relaxations on GSTR6A dates release today and will applicable from Sept 2021', isCheck: true })

    // this.tasks.push({ task: 'File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai', date: '22nd july 2021', subtask: [{ task: 'Upload the Respective Trade Name Sale Register,', date: '20th july 2021' }, { task: 'Save to GSTIN & Get approval on the respective records', date: '21th july 2021' }] });
    // this.tasks.push({task:'File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai',date:'22nd july 2021',subtask:[{task:'Upload the Respective Trade Name Sale Register,',date:'20th july 2021'},{task:'Save to GSTIN & Get approval on the respective records',date:'21th july 2021'}]});
  }
  deleteEvent(ev) {

  }
  segmentChanged(event) {

  }
  async ngOnInit() {
    this.date = moment(this.selectedDate);
    this.selMonthYear = this.date.format("DD MMMM YYYY") 
    console.log('selected Month ',this.selMonthYear);
    this.weekNo = Math.ceil(this.date.date() / 7);
    this.getWeeks(this.date);
  }
  changeSelDate(){
    console.log('selected Month ',this.selMonthYear);
    this.date = moment(this.selMonthYear);
    console.log('selected Month ',this.selMonthYear);
    this.weekNo = Math.ceil(this.date.date() / 7);
    this.getWeeks(this.date);
  }
  nextWeek() {
    this.date =   this.date.add(1, 'weeks');
    this.getWeeks(this.date);
  }
  previousWeek() {
    this.date =  this.date.subtract(1, 'weeks');
    this.getWeeks(this.date);
  }
  public getWeeks(currentDate) {
    this.days = [];
    this.weekNo = Math.ceil(this.date.date() / 7);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
    const today = moment().format("DD-MM");
    for (var i = 0; i <= 6; i++) {
      const day = moment(weekStart).add(i, 'days').format("DD")
      const dayMonth = moment(weekStart).add(i, 'days').format("DD-MM")
      const isCurrent = (dayMonth == today);
      this.days.push({ day: day, lbl: moment(weekStart).add(i, 'days').format("ddd"), task: [], isCurrent: isCurrent });
    };

    this.getTaskList(weekStart, weekEnd)
    this.getAllDueDates(weekStart, weekEnd)
  }
  getAllDueDates(startDate, endDate) {
    this.apiService.allDueDates(startDate, endDate).subscribe(
      async (response) => {
        let res: any = response;
        this.govDueDates=[];
        // console.log('Response ',res);
        if (res.success) {
          var keys = Object.keys(res.data);
          for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            this.days[i].gTotal = res.data[element].total;
            this.days[i].govDate = res.data[element].gov_due_data;
            console.log('Gov Due Date ',res.data[element])
            if (this.days[i].day == moment(this.selectedDate).format("DD")) {
              this.govDueDates = res.data[element].gov_due_data;
            }
          }
          // if (this.govDueDates.length == 0) {
          //   this.govDueDates = this.days[0].govDate;
          // }
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  getTaskList(startDate, endDate) {
    this.apiService.getTaskList(startDate, endDate).subscribe(
      async (response) => {
        let res: any = response;
        this.tasks = [];
        if (res.success) {
          var keys = Object.keys(res.data);
          this.eventList = res.data;
          for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            this.days[i].task = this.eventList[element];
            if (this.days[i].day == moment(this.selectedDate).format("DD")) {
              this.days[i].selected = true
              this.tasks = this.eventList[element];
              this.setData()
            }
             else {
              this.days[i].selected = false
            }
          }
          if (this.tasks.length == 0) {
            this.tasks = this.days[0].task;
            // this.days[0].selected = true
            this.setData()
          }
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  setData() {
    this.assiedToYou = [];
    this.assiedByYou = [];
    for (let k = 0; k < this.tasks.length; k++) {
      const element = this.tasks[k];
      if (element.is_assigned_to_you == 1) {
        this.assiedToYou.push(element)
      }
      if (element.is_assigned_by_you == 1) {
        this.assiedByYou.push(element)
      }
    }

    console.log('Assigned to you ',this.assiedToYou);
    console.log('Assigned by you ',this.assiedByYou);

  }
  formateDate(date) {
    return moment(date).format('DD MMM yyyy');
  }
  onClick(item, i) {
    console.log('item ', item.task)
    this.tasks = item.task;
    this.govDueDates = item.govDate;

    this.setData();

    // this.days[i].selected=true
    for (let k = 0; k < this.days.length; k++) {
      this.days[k].selected = (k == i);
    }
    if (this.tasks.length == 0) {
      for (let j = i; j < this.days.length; j++) {
        const element = this.days[j];
        if (element.task.length > 0) {
          this.upcomingDate = element.day;
          break;
        }
      }
    }

  }
  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
