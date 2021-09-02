import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Calendar } from "@ionic-native/calendar/ngx";
import { ApiService } from "src/app/services/api.service";
import { NavigationService } from "src/app/services/NavigationService";
import { GlobalProvider } from "src/app/shared/GlobalProvider";
import { StorageService } from "src/app/shared/StorageService";
import * as moment from "moment-timezone";
import { ModalController } from "@ionic/angular";
import { FilterPage } from "src/app/modals/filter/filter.page";

@Component({
  selector: "month",
  templateUrl: "./month.component.html",
  styleUrls: ["./month.component.scss"],
})
export class MonthComponent implements OnInit {
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  isShowUp = false;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;

  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    public store: StorageService,
    private apiService: ApiService,
    private calendar: Calendar, public modalController: ModalController,
    private navigation: NavigationService,
    public globle: GlobalProvider
  ) { }

  async openFilter(){
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'filter',
      componentProps: {
          btnLbl:'Back to Login',
          isSub:true,
          msg:'Go back to Login and enter your New Password'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    ).getDay();
    var prevNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    for (
      var i = prevNumOfDays - (firstDayThisMonth - 1);
      i <= prevNumOfDays;
      i++
    ) {
      this.daysInLastMonth.push({ day: i, task: "0" });
    }

    var thisNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push({ day: i + 1, task: "0" });
    }

    var lastDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();
    var nextNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 2,
      0
    ).getDate();
    for (var i = 0; i < 6 - lastDayThisMonth; i++) {
      this.daysInNextMonth.push({ day: i + 1, task: "0" });
    }
    var totalDays =
      this.daysInLastMonth.length +
      this.daysInThisMonth.length +
      this.daysInNextMonth.length;
    if (totalDays < 31) {
      for (var i = 7 - lastDayThisMonth; i < 7 - lastDayThisMonth + 7; i++) {
        this.daysInNextMonth.push({ day: i, task: "0" });
      }
    }
    this.change.emit({
      changeView: false,
      selectedDay: this.currentDate,
      month: this.currentMonth,
      year: this.currentYear,
    });
    this.getAllDueDates();
    //this.getTaskList();
  }
  checkEvent(day) {
    var hasEvent = false;
    var thisDate1 =
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      day +
      " 00:00:00";
    var thisDate2 =
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      day +
      " 23:59:59";
    // this.eventList.forEach(event => {
    //   if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
    //     hasEvent = true;
    //   }
    // });
    return hasEvent;
  }
  selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 =
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      day +
      " 00:00:00";
    var thisDate2 =
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      day +
      " 23:59:59";
    // this.eventList.forEach(event => {
    //   if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
    //     this.isSelected = true;
    //     this.selectedEvent.push(event);
    //   }
    // });

    this.change.emit({
      changeView: true,
      selectedDay: thisDate1,
      month: this.monthNames[this.date.getMonth()],
      year: this.currentYear,
    });
  }

  async ngOnInit() {
    this.date = new Date();
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.getDaysOfMonth();

  }
  getAllDueDates() {
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    );

    this.apiService.allDueDates(startDate, endDate).subscribe(
      async (response) => {
        let res: any = response;
        // console.log('Response ',res);
        if (res.success) {
          var keys = Object.keys(res.data);
          this.eventList = res.data;
          for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            // console.log('Response ', ' '+i ,' ' , this.eventList[element].length);
            this.daysInThisMonth[i].gTotal = this.eventList[element].total_due_date;
            this.daysInThisMonth[i].total_task = this.eventList[element].total_task;
            this.daysInThisMonth[i].gov_due_data = this.eventList[element].gov_due_data;
          }
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  getDayNumber(day) {
    return parseInt(moment(day).format("D"));
  }
  back() {
    this.navigation.back();
  }
}
