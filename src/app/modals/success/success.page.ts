import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  // btnLbl:string='Back to Login';
  // msg: string='Go back to Login and enter your New Password';

  isSub:boolean=false;
  btnLbl:string;
  msg: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.msg = this.navParams.data.msg;
    this.isSub = this.navParams.data.isSub;
    this.btnLbl = this.navParams.data.btnLbl;
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
