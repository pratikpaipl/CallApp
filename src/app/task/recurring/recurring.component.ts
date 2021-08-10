import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';

@Component({
  selector: 'recurring',
  templateUrl: './recurring.component.html',
  styleUrls: ['./recurring.component.scss'],
})
export class RecurringComponent implements OnInit {

  isRecurring: any = 'daily'

  @Input()
  lblValue: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();
  day = []

  constructor(public store: StorageService, private navigation: NavigationService, public globle: GlobalProvider) {

    this.day.push({ day: 'Sun', isCheck: false })
    this.day.push({ day: 'Mon', isCheck: false })
    this.day.push({ day: 'Tue', isCheck: false })
    this.day.push({ day: 'Wed', isCheck: false })
    this.day.push({ day: 'Thu', isCheck: false })
    this.day.push({ day: 'Fri', isCheck: false })
    this.day.push({ day: 'Sat', isCheck: false })

  }

  async ngOnInit() {

  }

  set() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
