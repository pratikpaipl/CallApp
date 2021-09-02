import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  // btnLbl:string='Back to Login';
  // msg: string='Go back to Login and enter your New Password';
  FilterOption=[]
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { 

   

  }

  ngOnInit() {
    this.FilterOption.push({val:'All',isChecked:false})
    this.FilterOption.push({val:'Income Tax',isChecked:false})
    this.FilterOption.push({val:'GST',isChecked:false})

    console.log(' FilterOption ',this.FilterOption);

    // console.table(this.navParams);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
