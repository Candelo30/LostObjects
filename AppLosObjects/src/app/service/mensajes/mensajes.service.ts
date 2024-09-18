import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(private socket: Socket) {}

  // Conectarse a la sala del chat
  joinRoom(room: string) {
    this.socket.emit('join', room);
  }

  // Enviar un mensaje
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  // Recibir mensajes
  getMessages(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }
}
