import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(private http: HttpClient) {}
  APIUrl = 'http://localhost:3003';
  getData(endpoint: String): Observable<any> {
    return this.http.get(`${this.APIUrl}/${endpoint}/`);
  }

  addMessage(endpoint: String, data: any) {
    return this.http.post(`${this.APIUrl}/${endpoint}/`, data);
  }
}
