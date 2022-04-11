import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../core/user/user';
import { UserService } from '../core/user/user.service';
import { MainService } from '../main/main.service';

@Injectable({providedIn: 'root'})
export class FormaaResolver implements Resolve<JSON>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: MainService,
        private userService: UserService
    )
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getFormaaa(this.user.id);
    }
}