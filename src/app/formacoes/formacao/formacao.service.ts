import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formacao } from './formacao';
import { FuncFormacao } from './FuncFormacao';

import { NewFormacao } from './newFormacao';

const API = "http://127.0.0.1:3006"

@Injectable()
export class FormacaoService
{
    constructor(private http: HttpClient){}

    sendFormacao(newFormacao: NewFormacao, id?: any)
    {
        return this.http.post(API + '/forma/add/' + id, newFormacao)
    }

    getAllFormacao()
    {
        return this.http.get<Formacao[]>(API + '/formas');        
    }

    getAllFormacaoByFuncId(id?: any)
    {        
        return this.http.get<FuncFormacao[]>(API + '/forma/' + id);        
    }   
    
    updateFormacao(newFormacao: NewFormacao, id?: any)
    {
        return this.http.post(API + '/forma/up/' + id, newFormacao)
    }

    deleteFormacao(id:any)
    {
        return this.http.get(API + '/funchasfor/del/' + id)
    }
}