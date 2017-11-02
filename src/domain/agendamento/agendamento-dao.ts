import { Injectable } from "@angular/core";

import { Agendamento } from '../../domain/agendamento/agendamento';
import { Storage } from "@ionic/storage";

import { Carro } from '../../domain/carro/carro';

@Injectable()
export class AgendamentoDAO{

    constructor(private _storage: Storage){

    }

    private _getKey(agendamento: Agendamento){
        return agendamento.email + agendamento.data.substr(0, 10);

    }

    listaTodos(){

        let agendamentos = [];

        return this._storage.forEach(dado => {
            let carro = new Carro(dado.carro.nome, dado.carro.preco)
            let agendamento = new Agendamento(
                carro,
                dado.valor,
                dado.nome,
                dado.endereco,
                dado.email,
                dado.data,
                dado.confirmado
            )

            agendamentos.push(agendamento);
        })
        .then(() => agendamentos);

    }

    salva(agendamento: Agendamento){
        let key = this._getKey(agendamento);

        return this._storage.set(key, agendamento);
    }
    
    verificaAgendamentoDuplicado(agendamento: Agendamento){
        let key = this._getKey(agendamento);

        return this._storage.get(key)
            .then(dado => {
                return dado ? true : false;
            });

    }



}