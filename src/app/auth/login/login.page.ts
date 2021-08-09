import { EventService } from '../../services/EventService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
import { NotePage } from 'src/app/modals/note/note.page';
import { SuccessPage } from 'src/app/modals/success/success.page';
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

  isFnameUn = false
  isPasswordUn = false
  passErr = ''
  emailErr = ''
  fnameErr = ''


  constructor(public globle: GlobalProvider, public actionSheetController: ActionSheetController, public modalController: ModalController, public store: StorageService, public apiService: ApiService, private route: ActivatedRoute, public router: Router, private menu: MenuController, private eventService: EventService,) {
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
  ngOnInit() {

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
      component: SuccessPage,
      cssClass: 'alert-success',
      componentProps: {
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
