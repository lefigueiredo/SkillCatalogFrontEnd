import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from './experiencia';

import { NewExperiencia } from './newExperiencia';

const API = "http://127.0.0.1:3006"

@Injectable()
export class ExperienciaService
{
    constructor(private http: HttpClient){}

    sendExperiencia(newExperiencia: NewExperiencia, id?: any)
    {
        return this.http.post(API + '/exp/add/' + id, newExperiencia)
    }

    getAllExperiencia()
    {
        return this.http.get<Experiencia[]>(API + '/exp');        
    }

    getAllExperienciaByFuncId(id?: any)
    {        
        return this.http.get<Experiencia[]>(API + '/exp/' + id);        
    }
    
}