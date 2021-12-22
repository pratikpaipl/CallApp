import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ToastController, ModalController, LoadingController, MenuController, ActionSheetController, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalProvider } from './shared/GlobalProvider';
import { StorageService } from './shared/StorageService';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare const removeMenu: any;
declare const pageToTop: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  navigate: any;
  constructor(public modalController: ModalController, private appVersion: AppVersion, public store: StorageService, public globle: GlobalProvider, private menu: MenuController, public router: Router, private popoverCtrl: PopoverController, private actionSheetCtrl: ActionSheetController, private toastController: ToastController, public modalCtrl: ModalController, private platform: Platform, public network: Network, public loadingController: LoadingController, private splashScreen: SplashScreen, private statusBar: StatusBar,) {
    this.initializeApp();
    this.backButtonEvent();
    if (this.platform.is('android') || this.platform.is('ios'))
      this.appVersion.getVersionNumber().then((data => {
        console.log('getVersionNumber', data)

      }))
  }

  async initializeApp() {
    await this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.splashScreen.hide();
      // this.callOneSignal();
    });
  }

  callOneSignal() {
    // this.oneSignal.startInit('app-key', 'pro-id');
    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    // this.oneSignal.handleNotificationReceived().subscribe(() => {
    //   // do something when notification is received
    //   this.badge.increase(1);
    //   //  this.badge.set(1);
    // });
    // this.oneSignal.handleNotificationOpened().subscribe(() => {
    //   // do something when a notification is opened
    // });
    // // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    // this.oneSignal.endInit();
    // this.oneSignal.getIds().then((id) => {
    //   this.store.saveData('PlayerID', id.userId);
    // });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.platform.backButton.subscribe(async () => {
        // close action sheet
        try {
          const element = await this.actionSheetCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }

        // close popover
        try {
          const element = await this.popoverCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }

        // close modal
        try {
          const element = await this.modalCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }

        // close side menua
        try {
          const element = await this.menu.getOpen();
          if (element) {
            this.menu.close();
            return;

          }

        } catch (error) {

        }

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else if (this.router.url === '/login') {
            if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              navigator['app'].exitApp(); // work in ionic 4
            } else {
              this.globle.showToast(this.store.getVal('press_back_again_to_exit_app'), 2000)
              this.lastTimeBackPress = new Date().getTime();
            }
          }
        });
      });
    });
  }
}
