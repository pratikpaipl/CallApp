import { EventService } from '../../../services/EventService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SegmentModel } from '../../../shared/segment.model';
import { ApiService } from '../../../services/api.service';
import { GlobalProvider } from '../../../shared/GlobalProvider';
import { StorageService } from '../../../shared/StorageService';
declare const getActionsFromMessage
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPasswordPage {


  constructor(public global: GlobalProvider, public store: StorageService, public apiService: ApiService, private route: ActivatedRoute, public router: Router, private menu: MenuController, private eventService: EventService,) {
    
  }

}
