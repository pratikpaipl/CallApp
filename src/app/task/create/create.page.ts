import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  showSub=false;

  constructor(public globle: GlobalProvider, public store: StorageService, public apiService: ApiService, public router: Router, private eventService: EventService,) {
   
  }
  ngOnInit(): void {

  }

  addSubTask(){
      this.showSub = !this.showSub
  }
}
