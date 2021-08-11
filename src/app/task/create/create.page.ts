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

  showSub = false;
  isRecurring = false;
  isSubTask = false;
  startDate:any= new Date().toISOString();
  minDate:any= new Date().toISOString();
  constructor(public globle: GlobalProvider, public store: StorageService, public modalController: ModalController, public apiService: ApiService, public router: Router, private eventService: EventService,) {

  }
  ngOnInit(): void {

  }

  setAsRecurring() {
    this.isRecurring = !this.isRecurring;
  }
  addSubTask() {
    this.isSubTask = !this.isSubTask;
  }

}
