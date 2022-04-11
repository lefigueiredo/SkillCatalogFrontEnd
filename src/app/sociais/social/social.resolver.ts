import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

import { Social } from './social';
import { SocialService } from './social.service';

@Injectable({providedIn: 'root'})
export class SocialResolver implements Resolve<Observable<Social[]>>
{
    user$: Observable<User>;
    user!: User;

    constructor(
        private service: SocialService, 
        private userService: UserService,
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {            
        return this.service.getAllSocialByFuncId(this.user.id);
    }
}