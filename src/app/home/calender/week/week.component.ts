import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/modals/confirmation/confirmation.page';
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
  assignedToYou = [];
  assignedByYou = [];
  selectedTaskTab = 'toyou'

  selMonthYear:any;

  remarks=''

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

  constructor(public store: StorageService, private apiService: ApiService,public modalController: ModalController, private calendar: Calendar, private navigation: NavigationService, public global: GlobalProvider) {
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
    this.assignedToYou = [];
    this.assignedByYou = [];
    for (let k = 0; k < this.tasks.length; k++) {
      const element = this.tasks[k];
      if (element.is_assigned_to_you == 1) {
        this.assignedToYou.push(element)
      }
      if (element.is_assigned_by_you == 1) {
        this.assignedByYou.push(element)
      }
    }
  }
  formateDate(date) {
    return moment(date).format('DD MMM yyyy');
  }
  markAsComplete(){
    console.log('item ', this.govDueDates)
      let selIds=[];
    for (let i = 0; i <  this.govDueDates.length; i++) {
      const element =  this.govDueDates[i];
      if(element.isCheck != undefined && element.isCheck){
        selIds.push(element.legislationactformsid)
      }
    }

    if(selIds.length == 0 ){
      this.global.showToast('Please select at least one due date ',1500)
    }else if(this.remarks.trim() == ''){
      this.global.showToast('Please enter compliance remarks',1500)
    }else{
      this.openModal(selIds)
    }
    console.log('selIds ', selIds)
  }

  async openModal(selIds) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'alert-success',
      componentProps: {
        msg:'Are you sure you want to complete <br /> checked gov due dates?'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ',dataReturned)
      if (dataReturned.data == 1) {
        this.completeDueDate(selIds)
      }
    });

    return await modal.present();
  }
  completeDueDate(seiId) {
    this.apiService.dueDateMarkCompletes(seiId,this.remarks).subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.remarks=''
          this.getWeeks(this.date);
         }
         this.global.showToast(res.message, 4000);
      },
      (error: Response) => {
        let err: any = error;
        this.global.showToast(err.error.message, 4000);
      }
    );
  }
  onClick(item, i) {
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
