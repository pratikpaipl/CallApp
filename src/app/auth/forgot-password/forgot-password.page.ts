import { EventService } from '../../services/EventService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SegmentModel } from '../../shared/segment.model';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';
declare const getActionsFromMessage
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {



  constructor(public globle: GlobalProvider, public store: StorageService, public apiService: ApiService, private route: ActivatedRoute, public router: Router, private menu: MenuController, private eventService: EventService,) {

  }

  send() {
    this.router.navigateByUrl('/verify-code');
  }
}
