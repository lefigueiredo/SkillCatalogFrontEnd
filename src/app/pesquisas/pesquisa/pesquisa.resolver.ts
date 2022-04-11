import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AllSearch } from './pesquisa';

import { PesquisaService } from './pesquisa.service';

@Injectable({providedIn: 'root'})
export class PesquisaResolver implements Resolve<Observable<AllSearch[]>>
{
    constructor(private service: PesquisaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.service.getAllSearch();
    }

    
}