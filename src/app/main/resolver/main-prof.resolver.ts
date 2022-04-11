import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { MainService } from '../main.service';

@Injectable({providedIn: 'root'})
export class MainProfResolver implements Resolve<Observable<JSON>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: MainService, 
        private userService: UserService,
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getProf(this.user.id);
    }
}