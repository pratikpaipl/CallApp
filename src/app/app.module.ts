import { EventService } from './services/EventService';
import { FormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/Camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NavigationService } from './services/NavigationService';
import { LoadingInterceptorService } from './services/interceptor/LoadingInterceptorService';
import { LoadingComponent } from './services/loading/loading.component';
import { AuthGuard } from './shared/authguard.service';
import { Storage } from '@ionic/storage-angular';
import { GlobalProvider } from './shared/GlobalProvider';
import { LoginGuard } from './shared/loginguard.service';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule,
    IonicModule.forRoot({ mode: 'md', rippleEffect: false }), HttpClientModule, AppRoutingModule],
  providers: [Storage, GlobalProvider, StatusBar, Network, Camera, NetworkInterface, AuthGuard, LoginGuard, Keyboard,
    SplashScreen, InAppBrowser, EventService, NavigationService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
