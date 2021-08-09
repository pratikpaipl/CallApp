import { EventService } from '../../services/EventService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { NotePage } from 'src/app/modals/note/note.page';
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

  emailL: any = '';
  passwordL: any = '';
  isPasswordUnL = false
  passErrL = ''
  emailErrL = ''


  InvitationKey: any = '';
  Latitude: any = '';
  Longitude: any = '';
  Address: any = '';
  City: any = '';
  State: any = '';
  Country: any = '';
  ZipCode: any = '';
  email: any = '';
  password: any = '';
  isRemember = true;
  fname: any = '';
  lname: any = '';
  gender: any = '';

  passwordTypeL: string = 'password';
  passwordIconL: string = 'eye-off';

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  pageType = 'login';

  isFnameUn = false
  isPasswordUn = false
  passErr = ''
  emailErr = ''
  fnameErr = ''


  constructor(public globle: GlobalProvider, public modalController: ModalController, public store: StorageService, public apiService: ApiService, private route: ActivatedRoute, public router: Router, private menu: MenuController, private eventService: EventService,) {
    this.eventService.publishFormShowContact(false);
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
  async ngOnInit(): Promise<void> {



    if (this.pageType == 'login') {
      this.emailL = await this.store.rawValue('lEmial', 0)
      this.passwordL = await this.store.rawValue('lPwd', 0)
    }

    if (await this.store.rawValue('InvitationKey', 0) != null) {
      this.InvitationKey = await this.store.rawValue('InvitationKey', 0);
    }
    if (await this.store.rawValue('PageEmail', 0) != null) {
      this.email = await this.store.rawValue('PageEmail', 0);
    }
    if (await this.store.rawValue('crLat', 0) != null) {
      this.Latitude = await this.store.rawValue('crLat', 0);
    }
    if (await this.store.rawValue('crLng', 0) != null) {
      this.Longitude = await this.store.rawValue('crLng', 0);
    }
    if (await this.store.rawValue('crAddress', 0) != null) {
      this.Address = await this.store.rawValue('crAddress', 0);
    }
    if (await this.store.rawValue('City', 0) != null) {
      this.City = await this.store.rawValue('City', 0);
    }
    if (await this.store.rawValue('State', 0) != null) {
      this.State = await this.store.rawValue('State', 0);
    }
    if (await this.store.rawValue('State', 0) != null) {
      this.Country = await this.store.rawValue('Country', 0);
    }
    if (await this.store.rawValue('ZipCode', 0) != null) {
      this.ZipCode = await this.store.rawValue('ZipCode', 0);
    }

  }

  async submit(type) {

    if (type == '1') {
      this.isPasswordUn = false
      this.isFnameUn = false
      if (this.globle.checkMail(this.email)) {
        this.emailErr = this.store.getVal('please_enter_valid_email')
      }
      if (this.password.trim() == '') {
        this.isPasswordUn = true
        this.passErr = this.store.getVal('please_enter_password')
      }
      if (this.password.trim().length < 5) {
        this.isPasswordUn = true
        this.passErr = this.store.getVal('password_must_be_require_minimum_five_character')
      }
      if (this.fname.trim() == '') {
        this.isFnameUn = true
        this.fnameErr = this.store.getVal('first_name_must_be_require_minimum_one_character')
      }
      if (this.globle.checkMail(this.email) || this.password.trim().length < 5 || this.fname.trim().length < 1) {

      }
      else {
        let postData = new FormData();
        // if(this.BrandID !='0')
        postData.append("Email", this.email);
        postData.append("Password", this.password);

        postData.append("Disclaimer", '1');
        postData.append("FirstName", this.fname);
        postData.append("LastName", this.lname);
        postData.append("Gender", this.gender);
        if (this.Latitude)
          postData.append("Latitude", this.Latitude);
        if (this.Longitude)
          postData.append("Longitude", this.Longitude);
        if (this.Address)
          postData.append("Address", this.Address);
        if (this.InvitationKey)
          postData.append("InvitationKey", this.InvitationKey);
        if (this.City)
          postData.append("City", this.City);
        if (this.State)
          postData.append("State", this.State);
        if (this.Country)
          postData.append("Country", this.Country);
        if (this.ZipCode)
          postData.append("ZipCode", this.ZipCode);
        this.apiService.signUp(postData).subscribe(async response => {
          let res: any = response;
          if (res.success) {
            if (this.InvitationKey) {
              this.store.removeItem('InvitationKey')
              this.store.saveData('token', res.data.token);
              this.store.saveData('userData', res.data, true).then(async () => {
                this.router.navigateByUrl('/brand/' + await this.store.rawValue('PageSlug', 0) + '/page-role');
              });
            } else {
              // this.globle.showToast(res.message, 2000);
              this.store.saveData('altMsg', res, true).then(async () => {
                await this.router.navigateByUrl('/message/signup');
              })
            }
          } else {
            // this.globle.showToast(res.message, 4000, 'error');
            this.loadMsg = res.message.replace(/\+/g, ' ')
            for (let i = 0; i < getActionsFromMessage(this.loadMsg).length; i++) {
              const element = getActionsFromMessage(this.loadMsg)[i];
              this.messageAction.push(element.replace(/[{}]/g, ''))
            }
            for (let i = 0; i < this.messageAction.length; i++) {
              const element = this.messageAction[i];
              var dataApos = 0;
              for (let j = 0; j < this.dataAction.length; j++) {
                if (element == this.dataAction[j].ActionKey) {
                  dataApos = j
                  break
                }
              }
              this.loadMsg = this.globle.highlight(this.loadMsg, element, this.dataAction[dataApos].Text, this.dataAction[dataApos].FunctionName)// .replace(new RegExp("\\-", "g"), ' ')
            }
          }
        }, (error: Response) => {
          let err: any = error;
          this.globle.showToast(err.error.message, 4000);
        });
      }
    } else {
      this.isPasswordUnL = false
      if (this.globle.checkMail(this.emailL)) {
        this.emailErrL = this.store.getVal('please_enter_valid_email')
      }
      if (this.passwordL.trim() == '') {
        this.isPasswordUnL = true
        this.passErrL = this.store.getVal('please_enter_password')
      }
      if (this.passwordL.trim().length < 5) {
        this.isPasswordUnL = true
        this.passErrL = this.store.getVal('password_must_be_require_minimum_five_character')
      }
      if (this.globle.checkMail(this.emailL) || this.passwordL.trim().length < 5) {

      }
      else {
        let postData = new FormData();
        // if(this.BrandID !='0')
        postData.append("Email", this.emailL);
        postData.append("Password", this.passwordL);

        postData.append("RememberMe", this.isRemember ? '1' : '0');
        this.apiService.login(postData).subscribe(response => {
          let res: any = response;
          if (res.success) {
            if (this.isRemember) {
              this.store.saveData('lEmial', this.emailL)
              this.store.saveData('lPwd', this.passwordL)
            } else {
              this.store.removeItem('lEmial')
              this.store.removeItem('lPwd')
            }
            this.emailL = ''
            this.passwordL = ''
            this.store.saveData('token', res.data.token);
            this.store.saveData('userData', res.data, true).then(() => {
              this.eventService.publishFormRefresh(true);
            });
            this.globle.showToast(res.message, 4000);
            this.globle.Home();
          } else {
            this.globle.showToast(res.message, 4000, 'error');
          }
        }, (error: Response) => {
          let err: any = error;
          this.globle.showToast(err.error.message, 4000);
        });
      }
    }
  }
  home() {
    this.router.navigateByUrl('/home');
  }
  signup() {
    this.router.navigateByUrl('/register');
  }
  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: NotePage,
      cssClass: 'note',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
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
