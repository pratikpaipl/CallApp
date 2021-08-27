import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {AutoCompleteService} from 'ionic4-auto-complete';

import { environment } from 'src/environments/environment';
import { UserModel } from '../models/Users';
import { ResponseModel } from '../models/ResponseData';

@Injectable()
export class UserService implements AutoCompleteService {
  labelAttribute = 'full_name';

  private user:UserModel[] = [];

  constructor(
    private http:HttpClient
  ) {

  }

  getResults(keyword?:string):Observable<any[]> {
    keyword = typeof keyword === 'string' ? keyword : '';

    let observable:Observable<any>;

    if (this.user.length === 0) {
      observable = this.http.get(environment.BaseUrl+'get-gen-user-list').pipe(
        map(
          (results:ResponseModel) => {
            if (results) {
              this.user = results.data;
            }

            return this.user;
          }
        )
      );
    } else {
      observable = of(this.user);
    }

    return observable.pipe(
      map(
        (result:UserModel[]) => {
          return result.filter(
            (item) => {
              return item.full_name.toLowerCase().startsWith(
                  keyword.toLowerCase()
              );
            }
          );
        }
      )
    );
  }
}