import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { ModalController } from '@ionic/angular';
import { SuccessPage } from 'src/app/modals/success/success.page';
import { UserModel } from 'src/app/models/Users';

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
  isRecurring = false;
  isSubTask = false;
  startDate:any= new Date().toISOString();
  dueDate:any;
  minDate:any= new Date().toISOString();
  constructor(public global: GlobalProvider, public apiService: ApiService, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

    this.getTaskPriority();
    this.getUsers();
    // this.options.placeholder = 'Type user name to search..';
  }

  setAsRecurring() {
    this.isRecurring = !this.isRecurring;
  }
  addSubTask() {
    this.isSubTask = !this.isSubTask;
  }
  returnTask(event) {
    if(event.isSub !=undefined && event.isSub){
      this.isSubTask =false
        this.subTasks=[];
        console.log('Sub Task List',event.value)
        this.subTasks = event.value.contacts
    }else if(event.isSub !=undefined && !event.isSub){
      this.isSubTask =false
    }
  }

  // async addSubTask() {
  //   const modal = await this.modalController.create({
  //     component: SubTaskPage,
  //     cssClass: 'alert-success',
  //     componentProps: {
  //         btnLbl:'Back to Login',
  //         isSub:true,
  //         msg:'Go back to Login and enter your New Password'
  //     }
  //   });

  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //       // this.dataReturned = dataReturned.data;
  //       //alert('Modal Sent Data :'+ dataReturned);
  //     }
  //   });

  //   return await modal.present();
  // }

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
    console.log('this.selected ',this.selected )
    if(this.name == undefined || this.name ==''){
        this.global.showToast('Please enter name ',1500)
     }else if(this.desc == undefined || this.desc ==''){
        this.global.showToast('Please enter description ',1500)
      }
      else if(this.dueDate == undefined){
      this.global.showToast('Please select due date ',1500)
    }
      else if(this.selected == undefined || this.selected.length ==0){
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
      postData.append('assigned_to',Array.prototype.map.call(this.selected, s => s.generaluser_id).toString())

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
