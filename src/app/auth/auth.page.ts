import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();

    // spinner method
    // this.isLoading = true;
    // setTimeout(()=>{
    //   this.isLoading = false;
    //   this.router.navigateByUrl('/places/tabs/discover');
    // }, 1500);

    // loadingController method
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging in..'}).then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }


  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if(this.isLogin){
      // send request to login
      this.onLogin();
    }
    else{
      // send request to signup

    }

  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        buttons: ['Okay'],
        message,
      })
      .then(alertEl => alertEl.present());
  }
}
