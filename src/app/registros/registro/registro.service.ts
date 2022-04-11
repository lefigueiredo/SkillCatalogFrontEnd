import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from './registros';

const API = "http://127.0.0.1:3006"

// /http://c778-2804-d55-5521-9b00-93ce-845b-3510-fa6f.sa.ngrok.io

@Injectable()
export class RegistroService
{
    constructor(private http: HttpClient){}

    sendRegistro(newFunc: any)
    {
        return this.http.post(API + '/usuario/add', newFunc)
    }

    getAllRegistros()
    {
        return this.http.get<JSON[]>(API + '/usuario');        
    }  
    
    updateRegistro(newFormacao: JSON, id?: any)
    {
        return this.http.post(API + '/usuario/up/' + id, newFormacao)
    }

    deleteRegistro(id?: any)
    {
        return this.http.get(API + '/usuario/del/' + id)
    }
}