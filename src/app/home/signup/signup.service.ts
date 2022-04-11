import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewUser } from './new-user'

const API = "http://127.0.0.1:3006"

@Injectable()
export class signupService
{
    constructor(private http: HttpClient){}

    checkUserExists(userEmail: string)
    {
        return this.http.get(API + '/usuario/' + userEmail);
    }

    signup(newUser: NewUser)
    {
        return this.http.post(API + '/usuarioteste', newUser)
    }
    
}