import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import { Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';


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

  version: any
  constructor(public global: GlobalProvider, private platform: Platform, private appVersion: AppVersion, private navigation: NavigationService, public store: StorageService, public router: Router) {

    console.log(' ', this.platform.is('ios') + ',' + this.platform.is('android'))


    this.global.userData = localStorage.getItem('user-data') != undefined ? JSON.parse(localStorage.getItem('user-data')) : {}
  }

  ngOnInit() {
    this.global.userData = localStorage.getItem('user-data') != undefined ? JSON.parse(localStorage.getItem('user-data')) : {}

    console.log('Version ', this.appVersion)
    // if (this.platform.is('android') || this.platform.is('ios'))
    this.appVersion.getVersionNumber().then((data => {
      console.log('getVersionNumber', data)
      this.version = data
    }))

  }
  openProfile() {
    this.router.navigateByUrl('/0')
  }
  onClick(pageType) {
    if (pageType.type != undefined) {
      console.log('Click ', pageType.type);
      if (pageType.type == '9') {
        console.log('Click 1 ', pageType.type);
        localStorage.removeItem('access_token')
        localStorage.removeItem('user-data')
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
      else if (pageType.type != '3' && pageType.type != '6' && pageType.type != '8') {
        console.log('Click 2 ', pageType.type);
        this.router.navigateByUrl('/' + pageType.type)
      }
      else {
        console.log('Click 3 ', pageType.type);
        this.global.showToast('Coming soon !!', 1000);
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
