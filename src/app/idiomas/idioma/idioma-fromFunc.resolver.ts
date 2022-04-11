import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IdiomaService } from './idioma.service';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { FuncIdiomas } from './funcIdiomas';


@Injectable({providedIn: 'root'})
export class IdiomaFromFuncResolver implements Resolve<Observable<FuncIdiomas[]>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: IdiomaService,
        private userService: UserService
    )
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getFuncIdioma(this.user.id);
    }
}