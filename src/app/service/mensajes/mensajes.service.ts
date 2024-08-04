import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(private http: HttpClient) {}
  APIUrl = 'http://localhost:3001';
  getData(endpoint: String): Observable<any> {
    return this.http.get(`${this.APIUrl}/${endpoint}/`);
  }
}
