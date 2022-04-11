import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://127.0.0.1:3006"

@Injectable()
export class ProfileService
{
  constructor(private http: HttpClient){}

  sendImg(base64: any, id: any, tipo: any)
  {
    return this.http.post(API + '/img/add/' + id + '/' + tipo, base64)
  }

  getImgByUserId(id:any, tipo:any)
  {
    return this.http.get<any>(API + '/img/' + id + '/' + tipo);        
  }

  changePws(id:any, pwd:any)
  {
    return this.http.post<any>(API + '/change/' + id, pwd);        
  }

  resetPws(email:any)
  {
    return this.http.get<any>(API + '/reset/' + email);        
  }
}