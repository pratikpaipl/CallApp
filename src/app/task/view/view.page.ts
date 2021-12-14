import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  priority='medium'

  constructor(public globle: GlobalProvider, public store: StorageService, public apiService: ApiService, public router: Router, private eventService: EventService,) {
   
  }
  ngOnInit(): void {
  }
}
