import { EventService } from './../services/EventService';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';


import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class HomePage implements OnInit {
  isShowUp = false;
  selected = 3
  constructor( public store: StorageService, public globle: GlobalProvider, public apiService: ApiService, private eventService: EventService, public router: Router) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  list() {
    this.router.navigateByUrl('/task-list');
  }
  selectedPage(event) {
    console.log(event)
    this.selected = event.page
  }
  function(event) {
    if (event.detail.scrollTop == 0) {
      this.isShowUp = false;
      return
    } else {
      this.isShowUp = true;
    }
  }
  updateScroll(event) {
    this.isShowUp = event;
  }
}
