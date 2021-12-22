import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/modals/confirmation/confirmation.page';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  eventList: any = []
  upcomingDate: any;
  tasksCount = 0;
  tasks = [];

  upcommingDueDate: ""
  upcommingTaskByYou: ""
  upcommingTaskToYou: ""

  govDueDates = [];
  extensions = [];
  assignedToYou = [];
  assignedByYou = [];

  extensionsMain = [];
  govDueDatesMain = [];
  assignedToYouMain = [];
  assignedByYouMain = [];

  selectedTaskTab = 'toYou'

  selMonthYear: any;

  remarks = ''

  @Input()
  searchTerm: any = '';

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

  constructor(public store: StorageService, public router: Router, public eventService: EventService, private apiService: ApiService, public modalController: ModalController, private navigation: NavigationService, public global: GlobalProvider) {

    this.eventService.formRefresh$.subscribe((item: any) => {
      console.log('Task Update ', item)
      this.getWeeks(this.date);
    });

  }
  deleteEvent(ev) {

  }
  segmentChanged(event) {

  }
  ngOnChanges() {
    console.log('Search items ', this.searchTerm)
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.assignedByYou = this.assignedByYou.filter((item) => {
        return ((item.taskname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (item.assigned_by_user_details.full_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1));
      })
      this.assignedToYou = this.assignedToYou.filter((item) => {
        return ((item.taskname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (item.assigned_user_details.full_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1));
      })
      this.govDueDates = this.govDueDates.filter((item) => {
        return ((item.heading.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (item.content.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1));
      })
      this.extensions = this.extensions.filter((item) => {
        return ((item.heading.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) || (item.content.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1));
      })
      this.tasksCount = this.getCount();
    } else {
      this.extensions = this.extensionsMain
      this.govDueDates = this.govDueDatesMain
      this.assignedToYou = this.assignedToYouMain
      this.assignedByYou = this.assignedByYouMain
      this.tasksCount = this.tasks.length;
    }

  }
  getCount(): number {
    var tempArray = []
    for (let i = 0; i < this.assignedByYou.length; i++) {
      const element = this.assignedByYou[i];
      tempArray.push(element)
    }
    for (let i = 0; i < this.assignedToYou.length; i++) {
      const element = this.assignedToYou[i];
      tempArray.push(element)
    }
    const unique = tempArray.map(e => e.generaluser_taskdetails_id)
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => tempArray[e]).map(e => tempArray[e]);
    return unique.length;
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
    this.changeWeek();
  }
  previousWeek() {
    this.date = this.date.subtract(1, 'weeks');
    this.selectedDate = this.date
    this.getWeeks(this.date);
    this.changeWeek();
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
        this.extensions = [];
        this.extensionsMain = [];
        this.govDueDates = [];
        this.govDueDatesMain = [];
        this.tasks = [];
        let timeInMilisec: number = new Date(endDate).getTime() - new Date(startDate).getTime();
        let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));

        if (res.success) {

          this.upcommingDueDate = res.data.upcommingDueDate
          this.upcommingTaskByYou = res.data.upcommingTaskByYou
          this.upcommingTaskToYou = res.data.upcommingTaskToYou

          var keys = Object.keys(res.data);
          for (let i = 0; i < daysBetweenDates; i++) {
            const element = keys[i];
            this.days[i].total_extensions = res.data[element].total_extensions;
            this.days[i].total_due_date = res.data[element].total_due_date;
            this.days[i].total_task = res.data[element].total_task;
            this.days[i].govDate = res.data[element].gov_due_data;
            this.days[i].extensions = res.data[element].extensions;
            this.days[i].task = res.data[element].task_data;
            // console.log('Gov Due Date ', res.data[element])
            if (this.days[i].day == moment(this.selectedDate).format("DD")) {
              this.days[i].selected = true
              this.tasks = res.data[element].task_data
              this.tasksCount = this.tasks.length;
              this.extensions = res.data[element].extensions;
              this.extensionsMain = res.data[element].extensions;
              this.govDueDates = res.data[element].gov_due_data;
              this.govDueDatesMain = res.data[element].gov_due_data;
              this.setData()
            } else {
              this.days[i].selected = false
            }
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
    this.assignedToYouMain = [];
    this.assignedByYouMain = [];
    for (let k = 0; k < this.tasks.length; k++) {
      const element = this.tasks[k];
      if (element.is_assigned_to_you == 1) {
        this.assignedToYou.push(element)
        this.assignedToYouMain.push(element)
      }
      if (element.is_assigned_by_you == 1) {
        this.assignedByYou.push(element)
        this.assignedByYouMain.push(element)
      }
    }
    this.tasksCount = this.tasks.length;
  }
  formateDatemain(date) {
    return moment(date).format('DD MMM yyyy');
  }

  formateDate(date) {
    return moment(date).format('DD MMM');
  }
  checkAnyOneEnable() {
    return (this.govDueDates.find(x => x.is_disabled == 0) || this.extensions.find(x => x.is_disabled == 0))
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
    for (let i = 0; i < this.extensions.length; i++) {
      const element = this.extensions[i];
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
  viewTask(item) {
    this.router.navigate(['/view'], {
      queryParams: {
        value: JSON.stringify(item)
      },
    });
  }
  updateTask(item) {
    this.router.navigate(['/edit-task'], {
      queryParams: {
        value: JSON.stringify(item)
      },
    });
    // this.router.navigateByUrl('/edit-task/'+item.generaluser_taskdetails_id);
  }
  async deleteTask(item) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'alert-success',
      componentProps: {
        msg: 'are you sure you want to delete ' + item.taskname + '?'
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
          console.log(' index ', index);
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
    console.log('extensions ', item)
    this.tasks = item.task;
    this.govDueDates = item.govDate;
    this.extensions = item.extensions;
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
  changeWeek() {
    this.change.emit({ type: 1 });
  }
  back() {
    this.navigation.back();
  }
}
