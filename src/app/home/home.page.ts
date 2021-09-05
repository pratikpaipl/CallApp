import { EventService } from './../services/EventService';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';


import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class HomePage implements OnInit {

  selMonthYear: any = new Date().toISOString();

  isShowUp = false;
  showWeek = false;
  selected = 0

  minDate: any = new Date().toISOString()
  maxDate = moment().add(3, 'y').format('YYYY');

  selectedDate: any = new Date().toISOString()
  constructor(public store: StorageService, public globle: GlobalProvider, public apiService: ApiService, private eventService: EventService, public router: Router) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  logout() {
    localStorage.removeItem('access_token')
    this.router.navigateByUrl('/login', { replaceUrl: true });
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
  titleClick() {
    if (this.selected == 0 && this.showWeek) {
      this.showWeek = false;
    } else if (this.selected == 0 && this.showWeek) {

    }
  }
  changeView(event) {
    console.log('Change View ', event);
    this.showWeek = event.changeView;
    this.selMonthYear = event.selDate;
  }
}
