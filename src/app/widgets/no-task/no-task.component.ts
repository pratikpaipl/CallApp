import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'no-task',
  templateUrl: './no-task.component.html',
  styleUrls: ['./no-task.component.scss'],
})
export class NoTaskComponent implements OnInit {

  @Input()
  lblValue: String;

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
