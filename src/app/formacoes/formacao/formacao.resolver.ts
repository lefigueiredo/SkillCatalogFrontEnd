import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

import { Formacao } from './formacao';
import { FormacaoService } from './formacao.service';
import { FuncFormacao } from './FuncFormacao';

@Injectable({providedIn: 'root'})
export class FormacaoResolver implements Resolve<Observable<FuncFormacao[]>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: FormacaoService, 
        private userService: UserService,
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllFormacaoByFuncId(this.user.id);
    }
}