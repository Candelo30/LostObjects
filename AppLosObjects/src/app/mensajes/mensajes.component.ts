import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../service/mensajes/mensajes.service';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../service/users/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css',
})
export class MensajesComponent {
  toggleMenu: boolean = false;
  mensajes: any[] = [];
  users: any[] = [];
  nuevoMensaje = '';
  usuario = '';
  usuario_destinatario = '';
  imagen = '';
  mensajesFiltrados: any[] = [];
  IsOpenInput: boolean = false;
  foto = '';
  constructor(
    private chatService: MensajesService,
    private UsuariosService: UsuariosService,
    private router: Router,
    private cookies: CookieService
  ) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: string) => {
      this.mensajes.push(message);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.nuevoMensaje);
    this.nuevoMensaje = '';
  }

  ConseguirUsuario(user: string) {
    this.usuario_destinatario = user;
    this.filtrarMensajesPorUsuario(user);
  }

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  filtrarMensajesPorUsuario(usuario: string) {
    this.mensajesFiltrados = this.mensajes.filter(
      (mensaje: any) => mensaje.usuario === usuario
    );
    console.log(`Mensajes filtrados para ${usuario}:`, this.mensajesFiltrados);
  }

  getUsers() {
    this.UsuariosService.getData('usuarios').subscribe((data) => {
      this.users = data;
    });
    this.usuario = this.UsuariosService.nombreUsuario;
    console.log(this.usuario);
  }

  logout() {
    this.UsuariosService.logout();
    this.router.navigate(['/login']);
  }
}
