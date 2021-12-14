import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
  export class MenuItemComponent implements OnInit {

  @Input()
  action: String;
  @Input()
  lblValue: String;

  @Input()
  bHight: String='0px';

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private navigation: NavigationService, public global: GlobalProvider) {
  }

  async ngOnInit() {

  }

  actionClick(nm) {
    console.log('menu item ',nm)
    this.change.emit({type:nm});
  }
  back() {
    this.navigation.back();
  }
}
