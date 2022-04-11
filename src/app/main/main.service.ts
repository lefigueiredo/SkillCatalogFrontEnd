import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../core/user/user';
import { UserService } from '../core/user/user.service';
import { ExperienciaService } from '../experiencias/experiencia/experiencia.service';
import { Formacao } from '../formacoes/formacao/formacao';

const API = "http://127.0.0.1:3006"

@Injectable()
export class MainService
{

    constructor(
        private http: HttpClient
    ) {}  
    
    getForma(id?: any)
    {        
        return this.http.get<JSON[]>(API + '/func/forma/' + id);        
    } 
    
    getTime(id?: any)
    {        
        return this.http.get<JSON>(API + '/func/time/' + id);        
    }    

    getFormaaa(id?: any)
    {        
        return this.http.get<JSON>(API + '/func/formaaa/' + id);        
    } 

    getProf(id?: any)
    {        
        return this.http.get<JSON>(API + '/func/prof/' + id);        
    }  

    getExp(id?: any)
    {        
        return this.http.get<JSON>(API + '/func/exp/' + id);        
    }  

    getIdi(id?: any)
    {        
        return this.http.get<JSON>(API + '/funchasidi/' + id);        
    }

    getBarColor()
    {        
        return this.http.get<JSON>(API + '/main/bar-color/');        
    }  

    getProfs(id?: any)
    {        
        return this.http.get<JSON>(API + '/funchasprof/' + id);        
    }

    getFuncProf(id?: any)
    {
        return this.http.get<JSON>(API + '/func/name/' + id);
    }
}