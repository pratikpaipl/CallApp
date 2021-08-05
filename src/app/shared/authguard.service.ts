// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (this.loggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/auth#login', { replaceUrl: true });
    return false;
  }

  loggedIn() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      return false;
    }
    return true;
  }
}
