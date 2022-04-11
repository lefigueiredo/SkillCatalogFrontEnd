import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewIdioma } from './newIdioma'
import { Idioma } from './idioma'
import { FuncIdiomas } from './funcIdiomas';
import { map } from 'rxjs/operators';

const API = "http://127.0.0.1:3006"

@Injectable()
export class IdiomaService
{
    constructor(private http: HttpClient){}

    sendIdioma(newIdioma: NewIdioma)
    {
        return this.http.post(API + '/funchasidi', newIdioma)
    }

    getAllIdiomas()
    {
        return this.http.get<Idioma[]>(API + '/idioma');        
    }

    getFuncIdioma(id: any)
    {
        return this.http.get<FuncIdiomas[]>(API + '/funchasidi/' + id);        
    }

    updateIdioma(id:any, json:JSON)
    {
        return this.http.post(API + '/funchasidi/updt/' + id, json)
    }

    deleteIdioma(id:any, json:JSON)
    {
        return this.http.post(API + '/funchasidi/del/' + id, json)
    }

    addNewIdioma(json:JSON)
    {
        return this.http.post(API + '/idioma/new', json)
    }

    getAllAvg()
    {
        return this.http.get<JSON>(API + '/idi/all/avg/');        
    }
}