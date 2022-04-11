import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component(
    {
        selector: 'sc-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    }
)
export class HeaderComponent
{
    user$: Observable<User>;
    user: User
    
    constructor(private userService: UserService, private router: Router)
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user )
    }

    logout()
    {
        this.userService.logout();
        this.user$ = null as any;
        this.router.navigate(['']);        
    }

    config()
    {
        this.router.navigate(['profile']);        
    }
}