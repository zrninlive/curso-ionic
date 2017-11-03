import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public email: String = "joao@alura.com.br";
  public password: String = "alura123"; 


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _service: UsuarioService,
    private _alertCtrl: AlertController
    ) {}


  efetuaLogin(){

    return this._service.efetuaLogin(this.email, this.password)
    .then(usuario => {
        console.log(console.log(usuario));
      })
    .then(() => this.navCtrl.setRoot(HomePage))
    .catch(err => {
      this._alertCtrl.create({
        title: "Falha no login",
        subTitle : "Usuário ou senha inválido",
        buttons: [ { text: "Ok"} ]
      }).present();
    });

  }

}
