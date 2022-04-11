import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Funcionario } from './funcionario';

const API = 'http://127.0.0.1:3006';

@Injectable({ providedIn: 'root' })
export class FuncionarioService
{
    constructor(private http: HttpClient) {}

    getFuncById(userId: string)
    {
        return this.http
            .get<Funcionario>(API + '/funcionario/' + userId);
    }
}