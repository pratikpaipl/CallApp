import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GlobalProvider } from '../../shared/GlobalProvider';
import { StorageService } from '../../shared/StorageService';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  pageTitle = 'Change Password'
  cpassword = ''
  password = ''
  forgot_password: any;
  isCPasswordUn = false
  cPassErr = ''
  isPasswordUn = false
  passErr = ''

  userData: any = {}
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordNType: string = 'password';
  passwordNIcon: string = 'eye-off';

  constructor(public globle: GlobalProvider, public store: StorageService, public apiService: ApiService, public router: Router, private eventService: EventService,) {
    this.eventService.formRefresh$.subscribe(async (item: any) => {
      this.userData = await this.store.rawValue('userData', 0)
    });
    this.eventService.publishFormShowContact(false);
  }

  hideCShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideShowPassword() {
    this.passwordNType = this.passwordNType === 'text' ? 'password' : 'text';
    this.passwordNIcon = this.passwordNIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  async ngOnInit(): Promise<void> {
    this.forgot_password = await this.store.rawValue('forgot_password', 1)
    this.userData = await this.store.rawValue('userData', 0)
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  submit(event) {

    this.isCPasswordUn = false
    this.isPasswordUn = false
    if (this.cpassword.trim() == '') {
      this.isCPasswordUn = true
      this.cPassErr = 'Please enter current password.'
    }
    if (this.password.trim().length < 5) {
      this.isPasswordUn = true
      this.passErr = this.store.getVal('password_must_be_require_minimum_five_character')
    }

    if (this.cpassword.trim() == '' || this.password.trim() == '') {

    }
    else {
      let postData = new FormData();
      // if(this.BrandID !='0')
      postData.append("Email", this.userData.Email);
      postData.append("OldPassword", this.cpassword);
      postData.append("NewPassword", this.password);

      this.apiService.changePassword(postData).subscribe(response => {
        let res: any = response;
        if (res.success) {
          this.globle.showToast(res.message, 2000);
          this.cpassword = ''
          this.password = ''
        } else {
          this.globle.showToast(res.message, 2000, 'error');
        }
      }, (error: Response) => {

        let err: any = error;

        this.globle.showToast(err.error.message, 2000);
      });

    }
  }
}
