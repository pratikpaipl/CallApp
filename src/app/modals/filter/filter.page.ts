import { Component, NgZone, OnInit } from '@angular/core';
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
  all=false
  income=false
  gst=false
  constructor(
    private modalController: ModalController,
    private ngZone: NgZone
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
  check(event, type){
    console.log('Type ',type)
    console.log('Event ',event.detail.checked)

    this.ngZone.run(() => {
      // if(event.detail.checked){
        this.gst = event.detail.checked
        this.income = event.detail.checked
      // }
    })

   
  }
  checkGst(event, type){
    
    // if(this.income && event.detail.checked)
    //   this.all = true
    //   else
    //   this.all = false
  }
  checkIncome(event, type){
    console.log('Type ',type)
    console.log('Event ',event.detail.checked)
    // if(this.gst && event.detail.checked)
    // this.all = true
    // else
    // this.all = false
  }
}
