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

  desc:any='';

  showSub = false;
  isRecurring = false;
  isSubTask = false;
  startDate:any= new Date().toISOString();
  dueDate:any;
  minDate:any= new Date().toISOString();
  constructor(public globle: GlobalProvider, private apiService: ApiService, public store: StorageService, public modalController: ModalController, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

  }

  setAsRecurring() {
    this.isRecurring = !this.isRecurring;
  }
  addSubTask() {
    this.isSubTask = !this.isSubTask;
  }

  createTask(){

    if(this.desc == undefined || this.desc ==''){
        this.globle.showToast('Please enter description ',1500)
      }else if(this.dueDate == undefined){
      this.globle.showToast('Please select due date ',1500)
    }else{
      this.apiService.createTask(this.desc,'1',this.startDate, this.dueDate).subscribe(
        async (response) => {
          let res: any = response;
          if (res.success) {
  
           }
           this.globle.showToast(res.message, 4000);
  
        },
        (error: Response) => {
          let err: any = error;
          this.globle.showToast(err.error.message, 4000);
        }
      );
    }

  }

}
