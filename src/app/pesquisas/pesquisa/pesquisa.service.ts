import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllSearch } from './pesquisa';

const API = "http://127.0.0.1:3006"

@Injectable()
export class PesquisaService
{
    constructor(private http: HttpClient){}

   getAllSearch()
   {
       return this.http.get<AllSearch[]>(API + '/pesq/all');
   }
}