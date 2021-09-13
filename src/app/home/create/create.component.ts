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
import { SubTaskComponent } from 'src/app/task/sub-task/sub-task.compnent';
import * as moment from 'moment';

@Component({
  selector: 'create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {


  @Input()
  data:any;

  public userIds: any[] = [];
  public selected: UserModel[] = [];
  tags: any = '';
  name: any = '';
  desc: any = '';
  isRecurring:any= false
  recurringData: any
  selectedUser: any=[]
  subTasks: any = []
  taskPriority = [];
  selPriority: any;
  showSub = false;
  startDate: any = new Date().toISOString();
  dueDate: any;
  minDate: any = new Date().toISOString();
  constructor(public global: GlobalProvider, public apiService: ApiService, private popoverCtrl: PopoverController, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {

  }
 async ngOnInit() {

   await this.getTaskPriority();
   await this.getUsers();
   this.setData();
   console.log('Data ',this.data);
    // this.options.placeholder = 'Type user name to search..';
  }
  setData() {
    if(this.data !=undefined){
      this.name= this.data.taskname;
      this.startDate= moment(this.data.start_date);
      this.dueDate= moment(this.data.due_date);
      this.desc= this.data.taskdescription;

      for (let i = 0; i < this.data.child_task.length; i++) {
        const element = this.data.child_task[i];
        this.subTasks.push({name:element.taskname,value:moment(element.startdate)})
      }
      // this.selectedUser = 
       this.isRecurring = false
      // { "parentId": null, "contacts": [ { "name": "cxcx", "value": "2021-09-12T13:08:47.177+05:30" } ] }
    // = this.data.taskdescription;
    }
  }

  async setAsRecurring() {
    const popover = await this.popoverCtrl.create({
      component: RecurringComponent,
      componentProps: {
        startDate: this.startDate,
        endDate: this.dueDate,
        subTasks: this.subTasks,
        recurringData:this.recurringData
      },
      translucent: true,
      backdropDismiss: false
    });

    popover.onDidDismiss().then((result) => {
      console.log('Recurring ', result);
      if(result.data.isSub){
        this.isRecurring=true;
        this.recurringData = result.data.data
      }
      // this.viewType = result['data'];

    });
    // if(this.isRecurring)
    return await popover.present();
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
          if (this.taskPriority.length > 0)
            this.selPriority = '' + this.taskPriority[0].taskpriority_id
          console.log('getTaskPriority list ', this.taskPriority)
          console.log('getTaskPriority ', this.selPriority)
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  getUsers() {
    this.apiService.genUserList().subscribe(
       (response) => {
        let res: any = response;
        if (res.success) {
          this.userIds = res.data
          console.log(' this.userIds ',this.userIds);
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
    console.log('onSelectedPriority ', this.selPriority)
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
    else if (this.selectedUser == undefined || this.selectedUser.length == 0) {
      this.global.showToast('Please select user ', 1500)
    }
    else if(this.isRecurring){
      const postData = new FormData();
      postData.append('recurring_type', this.recurringData.recurring_type)
      if(this.recurringData.recurring_type == 'weekly')
      postData.append('weekly_days', this.recurringData.weekly_days.join(','))
      if(this.recurringData.recurring_type == 'monthly')
      postData.append('repeate_month', this.recurringData.repeate_month)
      if(this.recurringData.recurring_type == 'yearly')
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
    postData.append('completionstatus', '1')
    postData.append('start_date', this.apiService.getDate(this.startDate))
    postData.append('due_date', this.apiService.getDate(this.dueDate))
    postData.append('assigned_to',this.selectedUser.join(','))
    postData.append('is_recurring', this.isRecurring?'1':'0')

    for (let i = 0; i < this.subTasks.length; i++) {
      const element = this.subTasks[i];
      if (element.isChecked != undefined && element.isChecked) {
        postData.append('subtask[' + i + '][taskname]', element.name)
        postData.append('subtask[' + i + '][start_date]', this.apiService.getDate(element.value))
      }

    }
    console.log('Data ', this.subTasks);
    this.apiService.createTask(postData).subscribe((response) => {
      let res: any = response;
      this.messagePop(res.message);
    },
      (error: Response) => {
        let err: any = error;
        this.global.showToast(err.error.message, 4000);
      }
    );
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
      this.name = ''
      this.desc = ''
      this.dueDate = ''
      this.selectedUser = ''
      this.subTasks = ''
      this.recurringData=undefined
      this.isRecurring=false
      this.dueDate = undefined
      if (dataReturned.data == 1) {
        // this.completeDueDate(selIds)
      }
    });

    return await modal.present();
  }
}
