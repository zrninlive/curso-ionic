import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from "@ionic/storage";

import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';

import { AgendamentoService } from '../domain/agendamento/agendamento-service';
import { AgendamentoDAO } from '../domain/agendamento/agendamento-dao';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


function provideStorage(){
  return new Storage(['indexeddb'], {
    name: 'aluracar',
    storeName: "agendamentos"
  });
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage
  ],
  providers: [
    AgendamentoService,
    AgendamentoDAO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Storage, useFactory: provideStorage }

  ]
})
export class AppModule {}
