import { RecurringComponent } from './../../task/recurring/recurring.component';
import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { ModalController, PopoverController } from '@ionic/angular';
import { SuccessPage } from 'src/app/modals/success/success.page';
import { UserModel } from 'src/app/models/Users';
import { SubTaskComponent } from 'src/app/task/sub-task/sub-task.compnent';

@Component({
  selector: 'create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {


  public userIds:any[] = [];
  public selected:UserModel[] = [];
  tags:any='';
  name:any='';
  desc:any='';
  selectedUser:any
  subTasks:any=[]
  taskPriority=[];
  selPriority:any;
  showSub = false;
  startDate:any= new Date().toISOString();
  dueDate:any;
  minDate:any= new Date().toISOString();
  constructor(public global: GlobalProvider, public apiService: ApiService,private popoverCtrl: PopoverController, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

    this.getTaskPriority();
    this.getUsers();
    // this.options.placeholder = 'Type user name to search..';
  }

  async setAsRecurring() {
    const popover = await this.popoverCtrl.create({
      component: RecurringComponent,
        componentProps: {
          startDate:this.startDate,
          endDate:this.dueDate,
          subTasks:this.subTasks
        },
      translucent: true,
      backdropDismiss: false
    });

    popover.onDidDismiss().then((result) => {
      console.log('Recurring ',result['data']);
      // this.viewType = result['data'];
      
    });

    return await popover.present();
  }
  async addSubTask() {
    const popover = await this.popoverCtrl.create({
      component: SubTaskComponent,
        componentProps: {
          startDate:this.startDate,
          endDate:this.dueDate,
          subTasks:this.subTasks
        },
      translucent: true,
      backdropDismiss: false
    });

    popover.onDidDismiss().then((result) => {
      console.log(result['data']);
      // this.viewType = result['data'];

      if(result['data'].isSub !=undefined && result['data'].isSub){
          this.subTasks=[];
          console.log('Sub Task List',result['data'].value)
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
          if(this.taskPriority.length > 0 )
          this.selPriority = ''+this.taskPriority[0].taskpriority_id
          console.log('getTaskPriority list ',this.taskPriority)
          console.log('getTaskPriority ',this.selPriority)
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
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.userIds = await res.data
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
  onSelectedPriority(){
    console.log('onSelectedPriority ',this.selPriority)
  }
 
  createTask(){
    console.log('this.selected ',this.selectedUser )
    // if(this.name == undefined || this.name ==''){
    //     this.global.showToast('Please enter name ',1500)
    //  }else 
     if(this.desc == undefined || this.desc ==''){
        this.global.showToast('Please enter description ',1500)
      }
      else if(this.dueDate == undefined){
      this.global.showToast('Please select due date ',1500)
    }
      else if(this.selectedUser == undefined || this.selectedUser.length ==0){
      this.global.showToast('Please select user ',1500)
    }
    else{

      const postData = new FormData();
      postData.append('taskname',this.name)
      postData.append('taskdescription',this.desc)
      postData.append('taskpriority_id',this.selPriority)
      postData.append('completionstatus','1')
      postData.append('start_date',this.apiService.getDate(this.startDate))
      postData.append('due_date',this.apiService.getDate(this.dueDate))
      postData.append('assigned_to',Array.prototype.map.call(this.selectedUser, s => s.generaluser_id).toString())

      for (let i = 0; i < this.subTasks.length; i++) {
        const element = this.subTasks[i];
        if(element.isChecked !=undefined && element.isChecked){
          postData.append('subtask['+i+'][taskname]', element.name)
          postData.append('subtask['+i+'][start_date]', this.apiService.getDate(element.value))
        }

      }
      console.log('Data ',this.subTasks);
      this.apiService.createTask(postData).subscribe( (response) => {
          let res: any = response;
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
    console.log('Open Message ',message);
    // this.global.showToast(message, 4000);
    this.openModal(message);
  }


async openModal(msg) {
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'alert-success',
      componentProps: {
        msg:msg,
        isSub:false,
        btnLbl:'Close'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ',dataReturned)
      this.name=''
      this.desc=''
      this.dueDate=''
      this.selectedUser=''
      this.subTasks=''
      this.dueDate =undefined
      if (dataReturned.data == 1) {
        // this.completeDueDate(selIds)
      }
    });

    return await modal.present();
  }
}
