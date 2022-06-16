import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { AcercaDePage } from './shared/acerca-de/acerca-de.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    public modalController: ModalController,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        this.splashScreen.hide();
      }
    });
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.router.navigateByUrl('/auth');
  }

  rutear() {
    this.router.navigateByUrl('/bookings');
  }

  async acercaDe() {
    
    const modal = await this.modalController.create({
      component: AcercaDePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
