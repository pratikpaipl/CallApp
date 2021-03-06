import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { EventService } from '../services/EventService';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  sec = 'pi2lifedatakey'
  userData: any;
  permissionList = [];
  labelList = [];
  locFavList: any[];
  public kmList: any = []

  regWeb: any;

  private dataStorage: Storage;
  private labelStorage: Storage;
  private permissionStorage: Storage;
  public searchMsg: any;

  constructor(private http: HttpClient, public router: Router, private eventService: EventService, public alertController: AlertController,) {

    this.labelStorage = new Storage({
      name: 'labelStorage',
      storeName: '_labelStorage',
    });
    this.dataStorage = new Storage({
      name: 'dataStorage',
      storeName: '_dataStorage',
    });
    this.permissionStorage = new Storage({
      name: 'permissionStorage',
      storeName: '_permissionStorage',
    });
    this.kmList = [];
  }

  async savePemission(key: string, value: any, isJson?) {
    await this.permissionStorage.create().then(async (data) => {
      await this.permissionStorage?.set(key, this.encryptData(value));
    });
  }
  async saveData(key: string, value: any, isJson?) {
    if (key == 'token')
      localStorage.setItem(key, value);
    else {
      await this.dataStorage.create().then(async (data) => {
        await this.dataStorage?.set(key, this.encryptData(value));
      });
    }
  }
  async saveLabel(key: string, value: any, isJson?) {
    await localStorage.setItem(key, this.encryptData(value));
    // await this.labelStorage.create().then(async (data) => {
    //     await this.labelStorage?.set(key, this.encryptData(value));
    // })
  }
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.sec).toString();
    } catch (e) {
      console.log(e);
    }
  }
  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.sec);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  getDataFromDb(id, type): Promise<void> {
    if (type == 0) {
      return this.dataStorage.create().then((data) => {
        return this.dataStorage.get(id).then((data) => {
          if (data != null)
            return this.decryptData(data)
        }).catch((err) => {
          console.log('error ', err);
        });
      });
    } else if (type == 1) {
      return this.decryptData(localStorage.getItem(id));
    } else if (type == 2) {
      return this.permissionStorage.create().then((data) => {
        return this.permissionStorage.get(id).then((data) => {
          if (data != null)
            return this.decryptData(data)
        }).catch((err) => {
          console.log('error ', err);
        });
      });
    }
  }

  getVal(key: any) {
    if (this.labelList.length > 0)
      return this.labelList.find(x => x.TextKey === key).Text;
  }

  checkRole(key: any, role) {
    var obj = this.getPermissionObj(key)
    // console.log('key ', key, ' obj.RoleIDs ', obj.RoleIDs);

    if (obj?.RoleIDs != null && obj?.RoleIDs != undefined)
      return obj.RoleIDs.includes(role);
    else
      return false
  }
  displayName(key: any): String {
    var obj = this.getPermissionObj(key)
    if (obj.DisplayName != undefined)
      return obj.DisplayName;
  }

  getPermissionObj(key: any) {
    if (this.permissionList.length > 0)
      return this.permissionList.find(x => x.PermissionsKey === key);
  }
  getPermissionVal(key: any) {
    for (let i = 0; i < this.permissionList.length; i++) {
      const element = this.permissionList[i];
      if (element.PermissionsKey === key) {
        return element.DisplayName;
        break;
      }
    }
  }
  getShop(cnt) {
    if (cnt <= 1) {
      return this.getVal('shop')
    } else {
      return this.getVal('shops')
    }
  }
  rawValue(id, type) {
    if (type == 1) {
      return this.getVal(id);
    }
    return this.getDataFromDb(id, type);
  }
  getToken() {
    return localStorage.getItem('token')
  }
  getData(id) {
    return localStorage.getItem(id);
  }
  async removeItem(key) {
    localStorage.removeItem(key);
    this.dataStorage.create().then((data) => {
      this.dataStorage.remove(key);
    });
    this.permissionStorage.create().then((data) => {
      this.permissionStorage.remove(key);
    })
    this.labelStorage.create().then((data) => {
      this.labelStorage.remove(key);
    })
  }
  async presentLogout(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      animated: true,
      cssClass: 'alertAnimate',
      buttons: [
        {
          text: btnNo ? btnNo : this.getVal('cancel'),
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: btnYes ? btnYes : this.getVal('yes'),
          handler: () => {
            localStorage.clear();
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }


}

