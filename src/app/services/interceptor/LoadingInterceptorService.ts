import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoadingService } from '../LoaderService';
import { Network } from '@ionic-native/network/ngx';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService {
    userData: any;
    activeRequests: number = 0;

    constructor(private loadingScreenService: LoadingService, public network: Network, public globle: GlobalProvider) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!window.navigator.onLine) {
            // if there is no internet, throw a HttpErrorResponse error
            // since an error is thrown, the function will terminate here
            const error = {
                status: 0,
                error: {
                    description: 'Check Connectivity!',
                    message: 'You do not have an Internet connection. Please check your connection status',
                },
                statusText: 'Check Connectivity!'
            };
            this.globle.showToast('You do not have an Internet connection. Please check your connection status', 2000, 'error');
            // this.globle.presentAlert('No internet', 'You do not have an Internet connection. Please check your connection status', 'Ok')
            return throwError(new HttpErrorResponse(error));
        } else {
            if (this.activeRequests === 0) {
                this.loadingScreenService.startLoading();
            }

            this.activeRequests++;
            let token;

            token = localStorage.getItem('token');

            if (token) {
                request = request.clone({
                    setHeaders: {
                        'Authorization': 'bearer ' + token,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                        'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    }
                });
            } else {
                request = request.clone({
                    setHeaders: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                        'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    }
                });
            }

            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.globle.openAlertToken(error.status, error.error.message)
                    } else if (error.status === 0) {
                        const error = {
                            status: 0,
                            error: {
                                description: 'Check Connectivity!',
                                message: 'You do not have an Internet connection. Please check your connection status',
                            },
                            statusText: 'Check Connectivity!'
                        };
                        this.globle.presentAlert('No internet', 'You do not have an Internet connection. Please check your connection status', 'Ok')
                        return throwError(new HttpErrorResponse(error));
                    }
                    return throwError(error);
                }), finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        this.loadingScreenService.stopLoading();
                    }
                })
            );
        };
    }
}