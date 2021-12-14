import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { EventService } from '../services/EventService';
import { NavigationService } from '../services/NavigationService';

@Injectable()
export class GlobalProvider {

    userData: any = {}
    CountryCodes = [];
    CountryCodes_0 = [];
    regEmail: any;
    regWeb: any;
    public alertPresented: any;
    public alertPresentedToken: any;
    maxDate: any = moment().add(50, 'y').format('YYYY');
    constructor(public alertController: AlertController, private eventService: EventService, public modalController: ModalController, private sanitizer: DomSanitizer, public router: Router, private navigation: NavigationService, public toastController: ToastController, public network: Network) {
        this.alertPresented = false
        this.alertPresentedToken = false

        this.regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        this.regWeb = /^((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/


        this.userData = localStorage.getItem('user-data') != undefined ? JSON.parse(localStorage.getItem('user-data')) : {}

    }

    firstLater() {
        if (this.userData != undefined && this.userData.full_name != undefined)
            return this.userData.full_name.substring(0, 1)
    }

    oneLater(name) {
        if (name != undefined && name != '')
            return name.substring(0, 1)
    }



    msgDisplay(arg0: boolean) {
        return arg0;
    }

    checkMail(email): boolean {
        return (email == '' || !this.regEmail.test(email))
    }
    checkWeb(web): boolean {
        return (web == '' || !this.regWeb.test(web))
    }
    Home() {
        this.router.navigateByUrl('/explore#all', { replaceUrl: true });
    }
    backPage() {
        this.navigation.back();
    }
    public highlight(loadMsg, query, msg, action) {
        if (!query) {
            return this.nl2br(loadMsg);
        }
        return this.nl2br(loadMsg.replace(new RegExp("{{" + query + "}}", "gi"), match => {
            if (action != null)
                return '<span class="pointer under-line actonTg" data-action="' + query + '" style="color: #b80a0a !important;" >' + msg + '</span>';
            else
                return '<span >' + msg + '</span>';
        }));
    }
    nl2br(text: string) {
        return text.replace(new RegExp('\r?\n', 'g'), '<br />')
    }
    public getCleanedString(str) {
        return str.replace(/_/g, ' ');
    }
    defFilterType(filterType) {
        var isPhysical, isOnline;
        if (filterType == 'isPhysical,isOnline') {
            isPhysical = true;
            isOnline = true;
        } else if (filterType == 'isPhysical') {
            isPhysical = true;
            isOnline = false;
        } else if (filterType == 'isOnline') {
            isPhysical = false;
            isOnline = true;
        } else {
            isPhysical = false;
            isOnline = false;
        }
        return isPhysical + ',' + isOnline;
    }
    defShopType(shopType) {
        var isPlace, isDelivery, isPickup;
        if (shopType == 'isPlace,isDelivery,isPickup') {
            isPlace = true;
            isDelivery = true;
            isPickup = true;
        } else if (shopType == 'isPlace') {
            isPlace = true;
            isDelivery = false;
            isPickup = false;
        } else if (shopType == 'isDelivery') {
            isPlace = false;
            isDelivery = true;
            isPickup = false;
        } else if (shopType == 'isPickup') {
            isPlace = false;
            isDelivery = false;
            isPickup = true;
        } else if (shopType == 'isPlace,isPickup') {
            isPlace = true;
            isDelivery = false;
            isPickup = true;
        } else if (shopType == 'isDelivery,isPickup') {
            isPlace = false;
            isDelivery = true;
            isPickup = true;
        } else if (shopType == 'isPlace,isDelivery') {
            isPlace = true;
            isDelivery = true;
            isPickup = false;
        } else {
            isPlace = false;
            isDelivery = false;
            isPickup = false;
        }
        return isPlace + ',' + isDelivery + ',' + isPickup;
    }
    setFilterType(isPhysical, isOnline) {
        var filterType = '';
        if (isPhysical && isOnline) {
            filterType = "isPhysical,isOnline";
        } else if (isPhysical && !isOnline) {
            filterType = "isPhysical";
        } else if (!isPhysical && isOnline) {
            filterType = "isOnline";
        } else if (isPhysical && isOnline) {
            filterType = "isPhysical,isOnline";
        } else {
            filterType = "";
        }
        return filterType;
    }
    setShopType(isPlace, isDelivery, isPickup) {
        var shopType = '';
        if (isPlace && isDelivery && isPickup) {
            shopType = "isPlace,isDelivery,isPickup";
        } else if (isPlace && !isDelivery && !isPickup) {
            shopType = "isPlace";
        } else if (!isPlace && isDelivery && !isPickup) {
            shopType = "isDelivery";
        } else if (!isPlace && !isDelivery && isPickup) {
            shopType = "isPickup";
        } else if (isPlace && !isDelivery && isPickup) {
            shopType = "isPlace,isPickup";
        } else if (!isPlace && isDelivery && isPickup) {
            shopType = "isDelivery,isPickup";
        } else if (isPlace && isDelivery && !isPickup) {
            shopType = "isPlace,isDelivery";
        } else {
            shopType = "";
        }
        return shopType;
    }
    isNet() {
        console.log('this.network.type  ', (this.network != null))
        return (this.network == null)
    }
    isNetwork() {
        if (this.network.type == 'none') {
            this.presentAlert('No internet', 'You do not have an Internet connection. Please check your connection status', 'Ok')
            return false;
        } else {
            return true;
        }
    }
    async showToast(msg: any, time: number, cls?: String) {
        const toast = await this.toastController.create({
            cssClass: cls != undefined ? "toast-class-block error" : "toast-class-block",
            message: msg,
            duration: time
        });
        toast.present();
    }
    async openAlert(message) {
        const alert = await this.alertController.create({
            message: message ? message : 'This is an alert message.',
            buttons: ['OK'],
            cssClass: 'alertAnimate',
            animated: true,
            backdropDismiss: false
        });
        return await alert.present();
    }
    async presentAlert(title, msg, btnOk, isBack?) {
        let vm = this
        if (!vm.alertPresented) {
            vm.alertPresented = true
            const alert = await vm.alertController.create({
                //   header: title,
                message: msg,
                animated: true,
                cssClass: 'alertCustomCssN',//alertCustomCss
                backdropDismiss: false,
                buttons: [
                    {
                        text: btnOk,
                        handler: () => {
                            vm.alertPresented = false
                            if (isBack)
                                this.backPage();
                        }
                    }
                ]
            });
            await alert.present();
        }
    }
    public getHtmlWithBypassedSecurity(code: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(code);
    }
    async openAlertToken(status, message) {
        let vm = this
        if (!vm.alertPresentedToken) {
            vm.alertPresentedToken = true
            const alert = await this.alertController.create({
                message: message ? message : 'This is an alert message.',
                cssClass: 'alertAnimate',
                animated: true,
                buttons: [
                    {
                        text: status == 401 ? 'Log in' : 'Ok',
                        handler: () => {
                            vm.alertPresentedToken = false
                            if (status == 401) {
                                localStorage.removeItem('access_token');
                                this.eventService.publishFormRefresh(false);
                                setTimeout(() => {
                                    this.router.navigateByUrl('/login', { replaceUrl: true });
                                }, 200);
                                // this.router.navigateByUrl('/explore#all', { replaceUrl: true });
                            }
                        }
                    }
                ],
                backdropDismiss: false
            });
            await alert.present();
        }
    }
}

