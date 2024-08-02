import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  APIUrl = 'http://localhost:3001';
  getData(endpoint: String): Observable<any> {
    console.log(`${this.APIUrl}/${endpoint}/`);
    return this.http.get(`${this.APIUrl}/${endpoint}/`);
  }

  addUser(endpoint: String, data: any): Observable<any> {
    console.log(`${this.APIUrl}/${endpoint}/`);
    return this.http.post(`${this.APIUrl}/${endpoint}/`, data);
  }
}
