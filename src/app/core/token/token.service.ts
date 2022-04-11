import { Injectable } from '@angular/core';

// Ações que envolvem o token do login no browser

const key = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService
{
    hasToken()
    {
        return !!this.getToken();
    }

    setToken(token: any)
    {
        window.localStorage.setItem(key, token)
    }

    getToken()
    {
        return window.localStorage.getItem(key)
    }

    removeToken()
    {
        window.localStorage.removeItem(key)
    }
}
