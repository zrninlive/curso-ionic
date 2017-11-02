import { Http } from '@angular/http';

//Autoriza a classe a utilizar http e providers
import { Injectable } from "@angular/core";

import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoDAO } from '../../domain/agendamento/agendamento-dao';



@Injectable()
export class AgendamentoService {

    constructor(
        private _http: Http,
        private _dao : AgendamentoDAO
    ){

    }

    private _geraUri(agendamento: Agendamento){
        return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    }

    agenda(agendamento: Agendamento){

        let api = this._geraUri(agendamento);

        return this._dao.verificaAgendamentoDuplicado(agendamento)
            .then(existe => {
                if(existe) throw new Error("Este agendamento já foi realizado");
                return this._http.get(api)
                  .toPromise()
                  .then(() => agendamento.confirmado = true, err => console.log(err))
                  .then(() => this._dao.salva(agendamento)) 
                  .then(() => agendamento.confirmado)
            })

    }

    reagenda(agendamento: Agendamento){

        let api = this._geraUri(agendamento);

        return this._http.get(api) 
                .toPromise()
                .then(() => agendamento.confirmado = true, err => console.log(err))
                .then(() => this._dao.salva(agendamento)) 
                .then(() => agendamento.confirmado)
    }
}

