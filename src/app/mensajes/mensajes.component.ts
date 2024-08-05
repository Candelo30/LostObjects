import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../service/mensajes/mensajes.service';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../service/users/usuarios.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css',
})
export class MensajesComponent implements OnInit {
  constructor(
    private messageService: MensajesService,
    private UsuariosService: UsuariosService
  ) {}
  toggleMenu: boolean = false;

  mensajes: any[] = [];
  users: any[] = [];
  nuevoMensaje = '';
  usuario = 'David';
  usuario_destinatario = '';

  ConseguirUsuario(user: string) {
    this.usuario_destinatario = user;
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      const newMessage = {
        fecha_creacion: `${new Date()}`, // Cambiado para usar la fecha actual
        message: `${this.nuevoMensaje}`,
        usuario: 'David',
        usuario_destinatario: `${this.usuario_destinatario}`,
      };
      this.messageService.addMessage('message', newMessage).subscribe(
        (Response) => {
          alert('Se a enviado correctamente');
          console.log(newMessage);
          this.nuevoMensaje = '';
        },
        (error) => {
          alert('Ah habido un error');
        }
      );
    }
  }
  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  ngOnInit(): void {
    this.getMesanjes();
    this.getUsers();
    // this.mensajes = this.messageService.getMessages();
  }

  getMesanjes() {
    this.messageService.getData('message').subscribe((data) => {
      this.mensajes = data;

      console.log(this.mensajes);
    });
  }
  getUsers() {
    this.UsuariosService.getData('usuarios').subscribe((data) => {
      this.users = data;
    });
    this.usuario = this.UsuariosService.nombreUsuario;
    console.log(this.usuario);
  }
}
