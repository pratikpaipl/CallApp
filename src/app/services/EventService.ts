import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {

  public updateLabel = new Subject();
  public clickShowSaveFilter = new Subject();
  public formFilter = new Subject();
  public formShowContact = new Subject();
  public formRefresh = new Subject();
  public formLocationUpdate = new Subject();
  public formReload = new Subject();
  public formChangeName = new Subject();
  public formUpateList = new Subject();
  public formDeleteFilter = new Subject();

  clickShowSaveFilter$ = this.clickShowSaveFilter.asObservable();
  updateLabel$ = this.updateLabel.asObservable();
  formFilter$ = this.formFilter.asObservable();
  formRefresh$ = this.formRefresh.asObservable();
  formShowContact$ = this.formShowContact.asObservable();
  formLocationUpdate$ = this.formLocationUpdate.asObservable();
  formReload$ = this.formReload.asObservable();
  formChangeName$ = this.formChangeName.asObservable();
  formUpateList$ = this.formUpateList.asObservable();
  formDeleteFilter$ = this.formDeleteFilter.asObservable();

  publishUpdateLabel() {
    this.updateLabel.next();
  }
  publishFormFilter(isEdit) {
    this.formFilter.next(isEdit);
  }
  publishShowSaveFilter(isEdit) {
    this.clickShowSaveFilter.next(isEdit);
  }
  publishFormRefresh(isLogin) {
    this.formRefresh.next(isLogin);
  }
  publishFormShowContact(isEdit) {
    this.formShowContact.next(isEdit);
  }
  publishFormLocationUpdate(isEdit) {
    this.formLocationUpdate.next(isEdit);
  }
  publishFormReload(isEdit) {
    this.formReload.next(isEdit);
  }
  publishFormChangeName(data) {
    this.formChangeName.next(data);
  }
  publishUpdateList() {
    this.formUpateList.next();
  }
  publishFormDeleteFilter(data) {
    this.formDeleteFilter.next(data);
  }
}