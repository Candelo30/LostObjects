import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(private http: HttpClient) {}

  ApiUrl = 'http://localhost:8000';

  getChats(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/chats/`);
  }

  // Obtener mensajes de un chat específico
  getMessages(chatId: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/chats/${chatId}/messages/`);
  }

  // Enviar un nuevo mensaje
  sendMessage(
    chatId: number,
    content: string,
    IdUSer: number
  ): Observable<any> {
    console.log(IdUSer);
    return this.http.post(`${this.ApiUrl}/messages/`, {
      chat: chatId,
      content,
      sender: IdUSer, // Agrega el ID del remitente
    });
  }
}
