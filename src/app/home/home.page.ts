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

  public toggled: boolean = false;
  searchTerm: String = '';
  isShowUp = false;
  showWeek = false;
  selected = 0

  minDate: any = new Date().toISOString()
  // maxDate = moment().add(3, 'y').format('YYYY');

  selectedDate: any = new Date().toISOString()
  weekSelDate: any = new Date().toISOString()
  constructor(public store: StorageService, public global: GlobalProvider, public apiService: ApiService, private eventService: EventService, public router: Router) {
    this.toggled = false;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  logout() {
    localStorage.removeItem('access_token')
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  public toggleSearch(): void {
    this.toggled = !this.toggled;
    this.searchTerm =  '';
 }
 triggerInput( ev: any ) {
  // Reset items back to all of the items
  // this.initializeItems();
  // set val to the value of the searchbar
  this.searchTerm =  ev.target.value
  console.log('Search items ',this.searchTerm)
  // if the value is an empty string don't filter the items
  // if (val && val.trim() != '') {
  //   this.items = this.items.filter((item) => {
  //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //   })
  // }  
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
    // console.log('Change View ', event);
    this.weekSelDate = moment(event.selectedDay)
    this.showWeek = event.changeView;
    this.selMonthYear = event.selDate;
  }
  changeWeek(event){
    console.log('Change Week ', event);
    if(event.type !=undefined && event.type == 1){
      this.searchTerm=''
      this.toggled=false;
    }
  }
}
