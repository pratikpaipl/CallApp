import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.scss'],
})
export class TopCardComponent implements OnInit {

  @Input()
  title: String;
  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


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
