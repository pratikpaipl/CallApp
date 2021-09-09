import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';
import * as moment from 'moment-timezone';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public global: GlobalProvider, public store: StorageService, public platform: Platform) {
  }
  getAuthToken(): any {
    return this.callGet("get-Jwt-token");
  }

  getDate(date) {
    return moment(date).format('DD-MM-yyyy')
  }

  allDueDates(startDate, endDate): any {
    const postData = new FormData();
    postData.append('start_date', this.getDate(startDate))
    postData.append('end_date', this.getDate(endDate))
    return this.callPost("get-all-due-dates", postData);
  }
  dueDateMarkCompletes(ids, remark): any {
    const postData = new FormData();
    postData.append('legislationact_forms_id', ids.join(','))
    postData.append('compliancestatus', "1")
    postData.append('complianceremarks', remark)
    return this.callPost("duedate-mark-complete", postData);
  }
  taskMarkCompletes(ids, remark): any {
    const postData = new FormData();
    postData.append('generaluser_taskdetails_id', ids.join(','))
    // postData.append('compliancestatus',"1")
    // postData.append('complianceremarks',remark)
    return this.callPost("task-mark-as-complete", postData);
  }
  createSubTask(postData): any {
    return this.callPost("create-subtask", postData);
  }
  genUserList(): any {
    return this.callGet("get-gen-user-list");
  }
  taskPriority(): any {
    return this.callGet("task-priority");
  }
  createTask(postData): any {

    return this.callPost("task-create", postData);
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
