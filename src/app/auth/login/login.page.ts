import { EventService } from '../../services/EventService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, MenuController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { SuccessPage } from 'src/app/modals/success/success.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare const getActionsFromMessage
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('content') content: any;

  loadMsg: any = '';
  messageAction: any = [];
  dataAction: any = [];

  passwordTypeL: string = 'password';
  passwordIconL: string = 'eye-off';

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  pageType = 'login';

  email = ''
  password = ''

  isFnameUn = false
  isPasswordUn = false
  passErr = ''
  emailErr = ''
  fnameErr = ''
  regEmail: any;

  version: any

  constructor(public global: GlobalProvider, private platform: Platform, private appVersion: AppVersion, public actionSheetController: ActionSheetController, public modalController: ModalController, public store: StorageService, public apiService: ApiService, private route: ActivatedRoute, public router: Router, private menu: MenuController, private eventService: EventService,) {
    this.eventService.publishFormShowContact(false);
    this.regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    // if (this.platform.is('android') || this.platform.is('ios'))
    this.appVersion.getVersionNumber().then((data => {
      console.log('getVersionNumber', data)
      this.version = data
    }))
  }

  hideShowPassword() {
    if (this.pageType == 'login') {
      this.passwordTypeL = this.passwordTypeL === 'text' ? 'password' : 'text';
      this.passwordIconL = this.passwordIconL === 'eye-off' ? 'eye' : 'eye-off';
    } else {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
  }
  ngOnInit() {
    console.log('Version ', this.appVersion)
    // if (this.platform.is('android') || this.platform.is('ios'))
    this.appVersion.getVersionNumber().then((data => {
      console.log('getVersionNumber', data)
      this.version = data
    }))

    setTimeout(() => {
      this.appVersion.getVersionNumber().then((data => {
        console.log('getVersionNumber', data)
        this.version = data
      }))
    }, 200);
  }
  checkMail(email): boolean {
    return (email == '' || !this.regEmail.test(email))
  }
  home() {
    // this.router.navigateByUrl('/home');
  }
  login() {
    console.log('console login')
    this.emailErr = ''
    this.isPasswordUn = false
    if (this.checkMail(this.email)) {
      this.emailErr = 'Please enter valid email'
    }
    // if (this.password.length < 6) {
    //   this.isPasswordUn = true
    //   this.passErr = 'Password must be require minimum five character'
    // }
    if (this.checkMail(this.email) || this.isPasswordUn) {
      console.log('console checkMail', this.checkMail(this.email))
      console.log('console isPasswordUn', this.isPasswordUn)
    } else {
      this.apiService.getAuthToken(this.email, this.password).subscribe(async response => {
        let res: any = response;
        console.log('Response ', res);
        if (res.success) {
          localStorage.setItem('access_token', res.access_token)
          localStorage.setItem('user-data', JSON.stringify(res.data))
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      }, (error: Response) => {
        let err: any = error;
        console.log('Error ', err)
        this.global.showToast(err.error.message, 4000);
      });
    }
  }
  signup() {
    this.router.navigateByUrl('/register');
  }
  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'alert-success',
      componentProps: {
        btnLbl: 'Back to Login',
        isSub: true,
        msg: 'Go back to Login and enter your New Password'
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
