// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (this.loggedIn()) {
      this.router.navigateByUrl('/auth#login', { replaceUrl: true });
      return true;
    }
    this.router.navigateByUrl('/explore#all', { replaceUrl: true });
    return false;
  }

  loggedIn() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      return true;
    }
    return false;
  }
}
