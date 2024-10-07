import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor() {}

  public connect() {
    const url = 'ws://localhost:8000/ws/chat/room_name/';
    this.socket = new WebSocket(url);
    
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Aquí puedes manejar el mensaje recibido
    };
  }

  public sendMessage(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  public close() {
    this.socket.close();
  }
}
