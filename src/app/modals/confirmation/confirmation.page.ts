import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  msg: string;
  modelId: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.msg = this.navParams.data.msg;
  }
  async action(data){
    await this.modalController.dismiss(data); 
  }
  // async closeModal() {
  //   const onClosedData: string = "Wrapped Up!";
  //   await this.modalController.dismiss(onClosedData); 
  //  }

}
