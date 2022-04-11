import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Social } from './social';

import { NewSocial } from './newSocial';

const API = "http://127.0.0.1:3006"

@Injectable()
export class SocialService
{
    constructor(private http: HttpClient){}

    sendSocial(newSocial: NewSocial, id?: any)
    {
        return this.http.post(API + '/soc/add/' + id, newSocial)
    }

    getAllSocial()
    {
        return this.http.get<Social[]>(API + '/soc');        
    }

    getAllSocialByFuncId(id?: any)
    {        
        return this.http.get<Social[]>(API + '/soc/' + id);        
    }
    
}