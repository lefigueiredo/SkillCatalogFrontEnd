import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario';


@Injectable({providedIn: 'root'})
export class FuncionarioResolver implements Resolve<Observable<Funcionario>>
{
    constructor(private service: FuncionarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        const username = route.params.userId;

        return this.service.getFuncById('1');
    }
}