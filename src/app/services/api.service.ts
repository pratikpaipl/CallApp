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

  getDate(date){
    return moment(date).format('DD-MM-yyyy')
  }

  allDueDates(startDate,endDate): any {
    const postData = new FormData();
      postData.append('start_date',this.getDate(startDate))
      postData.append('end_date',this.getDate(endDate))
    return this.callPost("get-all-due-dates",postData);
  }
  getTaskList(startDate,endDate): any {
    const postData = new FormData();
      postData.append('start_date',this.getDate(startDate))
      postData.append('due_date',this.getDate(endDate))
    return this.callPost("task-list-by-date",postData);
  }
  createTask(desc,priority,startDate,endDate): any {
    const postData = new FormData();
      postData.append('entityid',this.global.userData.entity_type_id)
      postData.append('general_user_id',this.global.userData.general_user_id)
      postData.append('applicationid','1')
      postData.append('taskname','File GSTR1 for 2020-21 for the Haryana, Maharashtra, Chennai')
      postData.append('taskdescription',desc)
      postData.append('taskpriority',priority)
      postData.append('isgrouptask','0')
      postData.append('completionstatus','1')
      postData.append('startdate',this.getDate(startDate))
      postData.append('duedate',this.getDate(endDate))
      postData.append('latestcomments','no update')
      postData.append('parentid','1')
    return this.callPost("task-create",postData);
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
