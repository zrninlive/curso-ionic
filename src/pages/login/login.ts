import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public email: String;
  public password: String;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  efetuaLogin(){
    console.log(this.email);
    console.log(this.password);
  }

}
