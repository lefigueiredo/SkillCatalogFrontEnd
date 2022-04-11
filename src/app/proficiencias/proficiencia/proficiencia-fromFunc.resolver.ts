import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProficienciaService } from './proficiencia.service';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { FuncProficiencia } from './funcProficiencia';


@Injectable({providedIn: 'root'})
export class ProficienciaFromFuncResolver implements Resolve<Observable<FuncProficiencia[]>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: ProficienciaService,
        private userService: UserService
    )
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getFuncProficiencia(this.user.id);
    }
}