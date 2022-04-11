import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../core/user/user';
import { UserService } from '../core/user/user.service';

import { ProfileService } from './profile.service';


@Injectable({providedIn: 'root'})
export class ProfileResolver implements Resolve<string>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: ProfileService,
        private userService: UserService
    )
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getImgByUserId(this.user.id, 'capa');
    }
}