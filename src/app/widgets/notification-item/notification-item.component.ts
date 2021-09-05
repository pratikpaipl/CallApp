import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
  export class NotificationItemComponent implements OnInit {

  @Input()
  brRadius:string;
  @Input()
  imgPath:string;
  @Input()
  heading:string;
  @Input()
  subheading: string;
  @Input()
  time:string;
  @Input()
  type: number;
  @Input()
  day: number;

  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private navigation: NavigationService, public globle: GlobalProvider) {
  }

  async ngOnInit() {

  }

  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
