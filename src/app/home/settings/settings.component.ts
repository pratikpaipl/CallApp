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

  }

  firstLater(){
    if(this.global !=undefined && this.global.userData !=undefined && this.global.userData.full_name !=undefined)
    return this.global.userData.full_name.substring(0,1)
  }

  onClick(pageType){
    if(pageType !=3 && pageType != 6 && pageType !=8)
    this.router.navigateByUrl('/'+pageType)
    else
    this.global.showToast('Coming soon !!',1000);
  }
  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
