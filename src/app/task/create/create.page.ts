import { SuccessPageModule } from './../../modals/success/success.module';
import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  name:any='File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai';
  desc:any='';
  userIds=[];
  selectedUser:any
  taskPriority=[];
  selPriority:any;
  showSub = false;
  isRecurring = false;
  isSubTask = false;
  startDate:any= new Date().toISOString();
  dueDate:any;
  minDate:any= new Date().toISOString();
  constructor(public global: GlobalProvider, private apiService: ApiService, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

    this.getTaskPriority();
    this.getGenUserList();
  }

  setAsRecurring() {
    this.isRecurring = !this.isRecurring;
  }
  addSubTask() {
    this.isSubTask = !this.isSubTask;
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
  onSelectedPriority(){
    console.log('onSelectedPriority ',this.selPriority)
  }
  getGenUserList() {
    this.apiService.genUserList().subscribe(
      async (response) => {
        let res: any = response;
        if (res.success) {
          this.userIds=res.data
          // this.users=this.userIds.
        }
      },
      (error: Response) => {
        let err: any = error;
        // this.global.showToast(err.error.message, 4000);
      }
    );
  }
  selectedUsers(item){
    // console.log('Selected--  ',this.selectedUser.map(function(a) {return a.generaluser_id;}));
    // console.log('Selected Items ',item.generaluser_id.join(','));
  }
  createTask(){
    if(this.name == undefined || this.name ==''){
        this.global.showToast('Please enter name ',1500)
     }else if(this.desc == undefined || this.desc ==''){
        this.global.showToast('Please enter description ',1500)
      }
      else if(this.dueDate == undefined){
      this.global.showToast('Please select due date ',1500)
    }
      else if(this.selectedUser == undefined || this.selectedUser ==''){
      this.global.showToast('Please select user ',1500)
    }
    else{
      this.apiService.createTask(this.name,this.desc,this.selPriority,this.startDate, this.dueDate,this.selectedUser).subscribe( (response) => {
          let res: any = response;
          // if (res.success) {
  
          //  }
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
    this.global.showToast(message, 4000);
    // this.openModal(message);
  }
async openModal(msg) {
    const modal = await this.modalController.create({
      component: SuccessPageModule,
      cssClass: 'alert-success',
      componentProps: {
        msg:msg,
        isSub:false,
        btnLbl:'Close'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      console.log('data returned ',dataReturned)
      if (dataReturned.data == 1) {
        // this.completeDueDate(selIds)
      }
    });

    return await modal.present();
  }
}
