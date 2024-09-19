import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../service/mensajes/mensajes.service';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../service/users/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HeaderComponent],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css',
})
export class MensajesComponent implements OnInit {
  toggleMenu: boolean = false;
  foto = '';
  idUser = 0;

  chats: any[] = [];
  messages: any[] = [];
  selectedChat: any;
  newMessage: string = '';

  constructor(
    private chatService: MensajesService,
    private UsuariosService: UsuariosService,
    private router: Router,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    this.getChats();

    const loggedInUser = this.cookies.get('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.idUser = user.id;
      this.foto = 'http://localhost:8000/' + user.imagen_perfil;

      // Llamar a otros métodos como `publications` si es necesario
    } else {
      this.router.navigate(['/login']);
    }
  }

  getChats(): void {
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
      console.log(this.chats);
    });
  }

  selectChat(chat: any): void {
    this.selectedChat = chat;
    this.getMessages(chat.id);
  }

  getMessages(chatId: number): void {
    this.chatService.getMessages(chatId).subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService
        .sendMessage(this.selectedChat.id, this.newMessage, this.idUser)
        .subscribe((message) => {
          this.messages.push(message);
          this.newMessage = '';
        });
    }
  }

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  logout() {
    this.UsuariosService.logout();
    this.router.navigate(['/login']);
  }
}
