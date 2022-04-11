import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { NewProficiencia } from './newProficiencia'
import { Proficiencia } from './proficiencia'
import { FuncProficiencia } from './funcProficiencia'

const API = "http://127.0.0.1:3006"

@Injectable()
export class ProficienciaService
{
    constructor(private http: HttpClient){}

    sendProficiencia(newProficiencia: NewProficiencia, id?:string)
    {
        return this.http.post(API + '/funchasprof/add/' + id, newProficiencia)
    }

    getAllProficiencia()
    {
        return this.http.get<Proficiencia[]>(API + '/prof')       
    }

    getFuncProficiencia(id: any)
    {
        return this.http.get<FuncProficiencia[]>(API + '/funchasprof/' + id)        
    }    

    updateProficiencia(newFormacao: JSON, id?: any)
    {
        return this.http.post(API + '/prof/up/' + id, newFormacao)
    }

    deleteProficiencia(id:any)
    {
        return this.http.get(API + '/funchasprof/del/' + id)
    }

    addNewProficiencia(json:JSON)
    {
        return this.http.post(API + '/prof/new', json)
    }

    getAllAvg()
    {
        return this.http.get<JSON>(API + '/prof/all/avg/');        
    }
}