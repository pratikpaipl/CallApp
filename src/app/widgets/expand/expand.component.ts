import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
})
  export class ExpandComponent implements OnInit {

    @Input()
    name : string;
    @Input()
    description : string;

    public isMenuOpen : boolean = false;

  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public store: StorageService, private navigation: NavigationService, public globle: GlobalProvider) {
  }

  async ngOnInit() {

  }
  public toggleAccordion() : void
  {
      this.isMenuOpen = !this.isMenuOpen;
  }

  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
