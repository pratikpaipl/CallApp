import { Component, OnInit } from '@angular/core';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.page.html',
  styleUrls: ['./error-page.page.scss'],
})
export class ErrorPage implements OnInit {
  error_404: any
  constructor(public store: StorageService) { }

  async ngOnInit() {
    this.error_404 = await this.store.rawValue('error_404', 1);

  }

}
