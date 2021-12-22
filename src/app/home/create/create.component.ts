import { element } from 'protractor';
import { SubTaskComponent } from '../../task/sub-task/sub-task.component';
import { RecurringComponent } from './../../task/recurring/recurring.component';
import { EventService } from '../../services/EventService';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { ModalController, PopoverController } from '@ionic/angular';
import { SuccessPage } from 'src/app/modals/success/success.page';
import { UserModel } from 'src/app/models/Users';
import * as moment from 'moment';

@Component({
  selector: 'create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {


  @Input()
  taskData: any;

  iconUrl: any;

  public userIds: any[] = [];
  public selected: UserModel[] = [];
  tags: any = '';
  // @Input()
  name: any = '';
  // @Input()
  desc: any = '';
  isRecurring: any = false
  Reminder: any = '1'
  recurringData: any
  selectedUser: any = []
  subTasks: any = []
  taskPriority = [];
  selPriority: any;
  showSub = false;
  // @Input()
  startDate: any;
  // @Input()
  dueDate: any;
  minDate: any = new Date().toISOString();
  maxDate: any;
  constructor(public global: GlobalProvider, public apiService: ApiService, private popoverCtrl: PopoverController, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {
    this.maxDate = global.maxDate;
  }
  ngOnInit() {
    this.global.getUserData()
    this.getTaskPriority();

    // this.options.placeholder = 'Type user name to search..';
  }
  setData() {
    if (this.taskData != undefined) {
      this.name = this.taskData.taskname;
      this.startDate = moment(this.taskData.start_date).toISOString();
      this.dueDate = moment(this.taskData.due_date).toISOString();
      this.desc = this.taskData.taskdescription;

      for (let i = 0; i < this.taskPriority.length; i++) {
        const element = this.taskPriority[i];
        if (element.taskpriority === this.taskData.task_priority) {
          this.selPriority = element.taskpriority_id;
          break;
        }
      }

      for (let i = 0; i < this.taskData.child_task.length; i++) {
        const element = this.taskData.child_task[i];
        this.subTasks.push({ name: element.taskname, value: moment(element.startdate) })
      }
    }
  }

  async setAsRecurring() {
    if (this.isRecurring) {
      if (this.startDate != undefined && this.dueDate != undefined) {
        const popover = await this.popoverCtrl.create({
          component: RecurringComponent,
          componentProps: {
            startDate: this.startDate,
            endDate: this.dueDate,
            subTasks: this.subTasks,
            recurringData: this.recurringData
          },
          translucent: true,
          backdropDismiss: false
        });

        popover.onDidDismiss().then((result) => {
          console.log('Recurring ', result.data.isSub != 0);
          this.isRecurring = result.data.isSub != 0;
          if (result.data.isSub != 0) {
            this.recurringData = result.data.data
          }
          // this.viewType = result['data'];

        });
        // if(this.isRecurring)
        return await popover.present();
      } else {
        this.isRecurring = false
        this.global.showToast('Please select start and due dates ', 1500)
      }

    }
  }
  removeSubTask(index) {
    this.subTasks.splice(index, 1);
  }
  async addSubTask() {
    const popover = await this.popoverCtrl.create({
      component: SubTaskComponent,
      componentProps: {
        startDate: this.startDate,
        endDate: this.dueDate,
        subTasks: this.subTasks
      },
      translucent: true,
      backdropDismiss: false
    });

    popover.onDidDismiss().then((result) => {
      console.log(result['data']);
      // this.viewType = result['data'];

      if (result['data'].isSub != undefined && result['data'].isSub) {
        this.subTasks = [];
        console.log('Sub Task List', result['data'].value)
        this.subTasks = result['data'].value.contacts
      }
    });

    return await popover.present();
  }
  getTaskPriority() {
    this.apiService.taskPriority().subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.taskPriority = await res.data
          if (this.taskPriority.length > 0) {
            this.selPriority = '' + this.taskPriority[0].taskpriority_id
            if (this.taskData != undefined) {
              for (let i = 0; i < this.taskPriority.length; i++) {
                const element = this.taskPriority[i];
                if (element.taskpriority === this.taskData.task_priority) {
                  this.selPriority = '' + element.taskpriority_id;
                  break;
                }
              }
            }
          }
          this.getUsers();

        }
      });
  }
  getUsers() {
    this.apiService.genUserList().subscribe(
      (response) => {
        let res: any = response;
        if (res.success) {
          this.userIds = res.data
          this.selectedUser = []
          for (let i = 0; i < this.userIds.length; i++) {
            const element = this.userIds[i];
            console.log(' this.userIds ', element.generaluser_id);
            console.log(' this.userIds ', this.global.userData.generaluser_id);
            console.log(' this.userIds ', element.generaluser_id == this.global.userData.generaluser_id);
            if (element.generaluser_id == this.global.userData.generaluser_id) {
              this.selectedUser.push(element.generaluser_id)
            }
          }

          console.log(' this.userIds ', this.selectedUser);
          this.setData();
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  onChangeUser(event) {
    console.log('onChangeUser ', event);
  }
  onSelectedPriority() {
    console.log('onSelectedPriority 0 ', this.selPriority)
    console.log('onSelectedPriority 1 ', this.taskPriority)
    let obj = this.taskPriority.find(x => x.taskpriority_id === parseInt(this.selPriority))
    // const index = this.taskPriority.findIndex(x => x.taskpriority_id === this.selPriority);
    // console.log('onSelectedPriority ', obj)
    // console.log('onSelectedPriority ', this.taskPriority[index])
    if (obj != undefined)
      this.iconUrl = obj.icon_url

  }

  createTask() {
    console.log('this.selected ', this.selectedUser)
    if (this.name == undefined || this.name == '') {
      this.global.showToast('Please enter name ', 1500)
    } else if (this.desc == undefined || this.desc == '') {
      this.global.showToast('Please enter description ', 1500)
    }
    else if (this.dueDate == undefined) {
      this.global.showToast('Please select due date ', 1500)
    }
    else if ((this.selectedUser == undefined || this.selectedUser.length == 0) && this.taskData == undefined) {
      this.global.showToast('Please select user ', 1500)
    }
    else if (this.isRecurring) {
      const postData = new FormData();
      postData.append('recurring_type', this.recurringData.recurring_type)
      if (this.recurringData.recurring_type == 'weekly')
        postData.append('weekly_days', this.recurringData.weekly_days.join(','))
      if (this.recurringData.recurring_type == 'monthly')
        postData.append('repeate_month', this.recurringData.repeate_month)
      if (this.recurringData.recurring_type == 'yearly')
        postData.append('repeate_year', this.recurringData.repeate_year)

      this.callCreate(postData);
    }
    else {
      const postData = new FormData();
      this.callCreate(postData);
    }
  }
  callCreate(postData) {

    postData.append('taskname', this.name)
    postData.append('taskdescription', this.desc)
    postData.append('taskpriority_id', this.selPriority)
    if (this.taskData == undefined)
      postData.append('completionstatus', '1')
    postData.append('start_date', this.apiService.getDate(this.startDate))
    postData.append('due_date', this.apiService.getDate(this.dueDate))
    if (this.taskData == undefined)
      postData.append('assigned_to', this.selectedUser.join(','))
    if (this.taskData == undefined)
      postData.append('is_recurring', this.isRecurring ? '1' : '0')
    if (this.taskData == undefined) {
      for (let i = 0; i < this.subTasks.length; i++) {
        const element = this.subTasks[i];
        if (element.isChecked != undefined && element.isChecked) {
          postData.append('subtask[' + i + '][taskname]', element.name)
          postData.append('subtask[' + i + '][start_date]', this.apiService.getDate(element.value))
        }
      }
    }
    if (this.taskData == undefined) {

      postData.append('reminder_before_days', this.Reminder);

      this.apiService.createTask(postData).subscribe((response) => {
        let res: any = response;
        this.messagePop(res.message);

      },
        (error: Response) => {
          let err: any = error;
          this.global.showToast(err.error.message, 4000);
        }
      );
    } else {
      postData.append('generaluser_taskdetails_id', this.taskData.generaluser_taskdetails_id)
      this.apiService.updateTask(postData).subscribe((response) => {
        let res: any = response;
        this.eventService.publishFormRefresh(true);
        this.messagePop(res.message);
      },
        (error: Response) => {
          let err: any = error;
          this.global.showToast(err.error.message, 4000);
        }
      );

    }
  }
  messagePop(message: any) {
    console.log('Open Message ', message);
    // this.global.showToast(message, 4000);
    this.openModal(message);
  }


  async openModal(msg) {
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'alert-success',
      componentProps: {
        msg: msg,
        isSub: false,
        btnLbl: 'Close'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ', dataReturned)
      if (this.taskData == undefined) {
        this.name = ''
        this.desc = ''
        this.dueDate = ''
        this.selectedUser = ''
        this.subTasks = ''
        this.recurringData = undefined
        this.isRecurring = false
        this.dueDate = undefined
      }
      if (dataReturned.data == '1') {
        if (this.taskData != undefined) {
          // this.global.backPage();
        }
        // this.completeDueDate(selIds)
      }
    });

    return await modal.present();
  }
}
