import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RegistroService } from './registro.service';
import { Registro } from './registros';

@Injectable({providedIn: 'root'})
export class RegistroResolver implements Resolve<Observable<JSON[]>>
{
    constructor(private service: RegistroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllRegistros();
    }
}