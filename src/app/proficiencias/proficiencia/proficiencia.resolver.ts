import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProficienciaService } from './proficiencia.service';
import { Proficiencia } from './proficiencia';


@Injectable({providedIn: 'root'})
export class ProficienciaResolver implements Resolve<Observable<Proficiencia[]>>
{
    constructor(private service: ProficienciaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllProficiencia();
    }
}