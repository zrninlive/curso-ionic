import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = LoginPage;

  public paginas = [ 
    { titulo: 'Agendamentos', componente : AgendamentosPage },
    { titulo: 'Perfil', componente : PerfilPage }
  ];

  //busca tipos nav no template, acessa elementos filhos
  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  abrePagina(pagina){
    this.nav.push(pagina.componente);  
  }
}
