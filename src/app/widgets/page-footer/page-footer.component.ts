import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EventService } from 'src/app/services/EventService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnInit {

  @Input()
  selected: any = "0";
  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(public globle: GlobalProvider, public store: StorageService, private menu: MenuController, public router: Router,) {
  }
  async ngOnInit() {
  }
  onChange() {
    console.log('OnChange ', this.selected);
  }
  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }
  create() {
    this.router.navigateByUrl('/create');
  }
  changeMenu(event) {
    this.change.emit({ page: event.detail.value })
  }
  segmentChanged(event) {
    // console.log('Event ', event.detail.value);
    this.change.emit({ page: event.detail.value })
  }
}

