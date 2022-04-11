import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'}) // depende de artefatos
export class AuthGuard implements CanActivate
{
    constructor(private userService: UserService, private router: Router) {}

    canActivate(    // Se retorna true, tem acesso a rota
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean>
    {
        if(this.userService.isLogged())
        {
            // TODO: Liberar quando passar o userName pelo token
            this.router.navigate(['main']) //(['func', this.userService.getUserName()])
            return false;
        }

        return true;
    }
}