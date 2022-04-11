import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IdiomaService } from './idioma.service';
import { Idioma } from './idioma';


@Injectable({providedIn: 'root'})
export class IdiomaResolver implements Resolve<Observable<Idioma[]>>
{
    constructor(private service: IdiomaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllIdiomas();
    }
}