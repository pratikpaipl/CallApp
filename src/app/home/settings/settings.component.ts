import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private navigation: NavigationService, public global: GlobalProvider,public router: Router) {
  }

  async ngOnInit() {
    this.global.userData = localStorage.getItem('user-data') != undefined ? JSON.parse(localStorage.getItem('user-data')) : {}

  }
openProfile(){
  this.router.navigateByUrl('/0')
}
  onClick(pageType){
    if(pageType.type != undefined){
      console.log('Click ',pageType.type);
      if(pageType.type == '9'){
        console.log('Click 1 ',pageType.type);
        localStorage.removeItem('access_token')
        localStorage.removeItem('user-data')
        this.router.navigateByUrl('/login', { replaceUrl: true });    
      }
      else if(pageType.type !='3' && pageType.type != '6' && pageType.type !='8'){
        console.log('Click 2 ',pageType.type);
        this.router.navigateByUrl('/'+pageType.type)
      }
      else{
        console.log('Click 3 ',pageType.type);
        this.global.showToast('Coming soon !!',1000);
      }
    }
  }

  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
