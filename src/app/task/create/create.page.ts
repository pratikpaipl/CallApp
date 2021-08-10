import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { SubTaskPage } from '../sub-task/sub-task.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  showSub = false;
  isRecurring = false;

  constructor(public globle: GlobalProvider, public store: StorageService, public modalController: ModalController, public apiService: ApiService, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

  }

  setAsRecurring() {
    this.isRecurring = !this.isRecurring;
  }
  async addSubTask() {
    const modal = await this.modalController.create({
      component: SubTaskPage,
      cssClass: 'sub-task',
      componentProps: {
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

}
