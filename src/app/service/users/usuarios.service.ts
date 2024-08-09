import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  nombreUsuario = '';

  conseguirUsuariologuaeado(user: string) {
    this.nombreUsuario = user;
    console.log(this.nombreUsuario);
  }

  APIUrl = 'http://127.0.0.1:8000';
  getData(endpoint: String): Observable<any> {
    console.log(`${this.APIUrl}/${endpoint}/`);
    return this.http.get(`${this.APIUrl}/${endpoint}/`);
  }

  addUser(endpoint: String, data: any): Observable<any> {
    console.log(`${this.APIUrl}/${endpoint}/`);
    return this.http.post(`${this.APIUrl}/${endpoint}/`, data);
  }
}
