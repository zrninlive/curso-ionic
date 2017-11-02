import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from "@angular/http";

import { EscolhaPage } from "../escolha/escolha";
import { Carro } from "../../domain/carro/carro";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  public carros: Carro[];

   constructor(
     public navCtrl: NavController,
     private _http: Http,
     private _loadingCtrl: LoadingController,
     private _alertCtrl: AlertController){
  }

  ngOnInit(){
      let loader = this._loadingCtrl.create({
        content: "Buscando novos carros. aguarde...",
       });

       loader.present();

        this._http.get("http://aluracar.herokuapp.com/")
          .map( res => res.json() )
          .toPromise()
          .then( carros => {
              this.carros = carros;
              loader.dismiss();
          })
          .catch(err => {
            console.log(err);
            loader.dismiss();

            this._alertCtrl.create({
              title: "Falha na conexão",
              buttons: [{ text: "Estou ciente!" }],
              subTitle: "Não foi possível obter a lista de carros, tente mais tarde"
            }).present();
          });
  }

  seleciona(carro: Carro){
    this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });
  }

}
