import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor
{
    constructor( private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent <any>>
    {
        if (this.tokenService.hasToken())
        {
            const token: any = this.tokenService.getToken(); 

            let new_req = req.clone(
                {
                    headers: req.headers.set('authorization', token)
                }
            )
            
            return next.handle(new_req)
           
        } else {

            return next.handle(req);
        }            
    }
}
