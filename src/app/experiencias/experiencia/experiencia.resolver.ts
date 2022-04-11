import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

import { Experiencia } from './experiencia';
import { ExperienciaService } from './experiencia.service';

@Injectable({providedIn: 'root'})
export class ExperienciaResolver implements Resolve<Observable<Experiencia[]>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: ExperienciaService, 
        private userService: UserService,
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllExperienciaByFuncId(this.user.id);
    }
}