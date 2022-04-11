import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

// Chama o endpoint da API para executar o login informando oq foi inserido no input

const apiUrl = 'http://127.0.0.1:3006';

@Injectable({ providedIn: 'root' })
export class AuthService
{
  constructor(
    private http: HttpClient,
    private userService: UserService  
  ) {}

  authenticate(email: string, senha_hash:string)
  {
    return this.http
      .post(apiUrl + '/login', 
        {
          email, senha_hash
        },
        {
          observe: 'response'
        }
      )

      .pipe(map(res => 
        {
          const authresp = JSON.parse(JSON.stringify(res.body))
          const authtoken = authresp.token;
          this.userService.setToken(authtoken);
          window.localStorage.setItem('authToken', authtoken);
        }
      )
    );    
  }
}
