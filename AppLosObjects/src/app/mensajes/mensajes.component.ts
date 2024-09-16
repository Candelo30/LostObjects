import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../service/mensajes/mensajes.service';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../service/users/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css',
})
export class MensajesComponent implements OnInit {
  constructor(
    private messageService: MensajesService,
    private UsuariosService: UsuariosService,
    private router : Router,
    private cookies : CookieService
  ) {}

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

  ConseguirUsuario(user: string) {
    this.usuario_destinatario = user;
    this.filtrarMensajesPorUsuario(user);
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      const newMessage = {
        fecha_creacion: `${new Date()}`, // Cambiado para usar la fecha actual
        message: `${this.nuevoMensaje}`,
        usuario: `${this.UsuariosService.nombreUsuario}`,
        usuario_destinatario: `${this.usuario_destinatario}`,
        imagen: `${this.imagen}`,
      };
      this.messageService.addMessage('message', newMessage).subscribe(
        (Response) => {
          alert('Se ha enviado correctamente');
          console.log(newMessage);
          this.nuevoMensaje = '';
          // Actualizar la lista de mensajes después de enviar uno nuevo
          this.getMesanjes();
        },
        (error) => {
          alert('Ha habido un error');
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
    const loggedInUser = this.cookies.get('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.foto = "http://localhost:8000/" + user.imagen_perfil;
      

      

     

    }

    else {
      this.router.navigate(["/login"])
    
    }
  }

  getMesanjes() {
    this.messageService.getData('message').subscribe((data) => {
      this.mensajes = data;
      this.filtrarMensajesPorUsuario(this.usuario_destinatario); // Filtrar los mensajes por el usuario seleccionado inicialmente
    });
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

  logout(){
    this.UsuariosService.logout();
    this.router.navigate(['/login']);
  }
}
