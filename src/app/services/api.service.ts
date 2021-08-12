import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public global: GlobalProvider, public store: StorageService, public platform: Platform) {
  }
  getAuthToken(): any {
    return this.callGet("get-Jwt-token");
  }
  callPost(endPoint, postData) {
    postData.append('LanguageCode', 'eng')
    return this.http.post(environment.BaseUrl + endPoint, postData);
  }
  callGet(endPoint, postData?, isDownload?) {
    var params = '';
    // params = (postData != undefined && postData != '') ? postData + "&" : "?";
    // params = params + "LanguageCode=eng";
    if (isDownload == undefined) {
      return this.http.get(environment.BaseUrl + endPoint + params);
    }
   
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
