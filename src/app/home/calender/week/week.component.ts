import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  selectedTaskTab = 'toYou'

  selMonthYear: any;

  remarks = ''

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

  constructor(public store: StorageService,public router: Router, private apiService: ApiService, public modalController: ModalController, private navigation: NavigationService, public global: GlobalProvider) {
  }
  deleteEvent(ev) {

  }
  segmentChanged(event) {

  }
  async ngOnInit() {
    this.date = moment(this.selectedDate);
    this.selMonthYear = this.date.format("DD MMMM YYYY")
    console.log('selected Month ', this.selMonthYear);
    this.weekNo = Math.ceil(this.date.date() / 7);
    this.getWeeks(this.date);
  }
  changeSelDate() {
    console.log('selected Month ', this.selMonthYear);
    this.date = moment(this.selMonthYear);
    console.log('selected Month ', this.selMonthYear);
    this.weekNo = Math.ceil(this.date.date() / 7);
    this.getWeeks(this.date);
  }
  nextWeek() {
    this.date = this.date.add(1, 'weeks');
    this.selectedDate = this.date
    this.getWeeks(this.date);
  }
  previousWeek() {
    this.date = this.date.subtract(1, 'weeks');
    this.selectedDate = this.date
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

    // this.getTaskList(weekStart, weekEnd)
    this.getAllDueDates(weekStart, weekEnd)
  }
  getAllDueDates(startDate, endDate) {
    this.apiService.allDueDates(startDate, endDate).subscribe(
      async (response) => {
        let res: any = response;
        this.govDueDates = [];
        this.tasks = [];
        // console.log('Response ',res);
        if (res.success) {
          var keys = Object.keys(res.data);
          for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            this.days[i].gTotal = res.data[element].total_due_date;
            this.days[i].total_task = res.data[element].total_task;
            this.days[i].govDate = res.data[element].gov_due_data;
            this.days[i].task = res.data[element].task_data;
            // console.log('Gov Due Date ', res.data[element])
            if (this.days[i].day == moment(this.selectedDate).format("DD")) {
              this.days[i].selected = true
              this.tasks = res.data[element].task_data
              this.govDueDates = res.data[element].gov_due_data;
              this.setData()
            } else {
              this.days[i].selected = false
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
  checkAnyOneEnable() {
    return this.govDueDates.find(x => x.is_disabled == 0)
  }
  markAsComplete() {
    console.log('item ', this.govDueDates)
    let selIds = [];
    for (let i = 0; i < this.govDueDates.length; i++) {
      const element = this.govDueDates[i];
      if (element.isCheck != undefined && element.isCheck) {
        selIds.push(element.legislationact_forms_id)
      }
    }

    if (selIds.length == 0) {
      this.global.showToast('Please select at least one due date ', 1500)
    } else if (this.remarks.trim() == '') {
      this.global.showToast('Please enter compliance remarks', 1500)
    } else {
      this.openModal(selIds, 'Are you sure you want to complete <br /> checked gov due dates?', '0')
    }
    console.log('selIds ', selIds)
  }

  tasksMark(event, item) {
    console.log('event ', event.detail.checked)
    // console.log('item ', item)
    for (let i = 0; i < item.child_task.length; i++) {
      const element = item.child_task[i];
      if (!element.completionstatus) {
        item.child_task[i].isCheck = event.detail.checked;
      }
    }

  }

  markAsCompleteTask(item) {
    console.log('item ', item)
    let selIds = [];
    if (item.isCheck != undefined && item.isCheck) {
      selIds.push(item.generaluser_taskdetails_id)
    }
    // let selIds = [];
    for (let i = 0; i < item.child_task.length; i++) {
      const element = item.child_task[i];
      if (item.isCheck != undefined && item.isCheck) {
        selIds.push(element.generaluser_taskdetails_id)
      } else {
        if (element.isCheck != undefined && element.isCheck) {
          selIds.push(element.generaluser_taskdetails_id)
        }
      }
    }

    if (selIds.length == 0) {
      this.global.showToast('Please select at least one tasks ', 1500)
      // } else if (this.remarks.trim() == '') {
      //   this.global.showToast('Please enter compliance remarks', 1500)
    } else {
      this.openModal(selIds, 'Are you sure you want to complete <br /> checked task?', '1')
    }
    // console.log('selIds ', selIds)
  }
  updateTask(item){
    this.router.navigate(['/edit-task'],{
      queryParams: {
         value : JSON.stringify(item)
        },
      });
    // this.router.navigateByUrl('/edit-task/'+item.generaluser_taskdetails_id);
  }
  async deleteTask(item){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'alert-success',
      componentProps: {
        msg: 'are you sure you want to delete '+item.taskname+'?'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ', item)
      if (dataReturned.data == 1) {
          this.deleteItem(item)
        
      }
    });

    return await modal.present();
  }

  async openModal(selIds, msg, type) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'alert-success',
      componentProps: {
        msg: msg
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ', selIds)
      if (dataReturned.data == 1) {
        if (type == 0)
          this.completeDueDate(selIds)
        else if (type == 1) {
          this.completeTaskDate(selIds)
        }
      }
    });

    return await modal.present();
  }
  completeDueDate(seiId) {
    this.apiService.dueDateMarkCompletes(seiId, this.remarks).subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.remarks = ''
          this.selectedDate = this.date
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
  completeTaskDate(seiId) {
    this.apiService.taskMarkCompletes(seiId, this.remarks).subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.remarks = ''
          this.selectedDate = this.date
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
  deleteItem(item) {
    this.apiService.taskDelete(item.generaluser_taskdetails_id).subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          // this.remarks = ''
          let index = this.tasks.indexOf(item);
          console.log(' index ',index);
          // if(index > -1){
          //   this.tasks.splice(index, 1);
          // }
          this.selectedDate = this.date
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
