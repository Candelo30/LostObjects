import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../service/users/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  toggleMenu: boolean = false;
  IsModalOpen: boolean = false;
  baseUrl: string = 'http://localhost:8000/media/';
  nombreUsuario = '';
  foto = '';
  nombre_busqueda: string = '';

  constructor(
    private router: Router,
    private userService: UsuariosService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    const loggedInUser = this.cookies.get('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.foto = 'http://localhost:8000/' + user.imagen_perfil;

      // Llamar a otros métodos como `publications` si es necesario
    } else {
      this.router.navigate(['/login']);
    }
  }

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  ShowModal() {
    this.IsModalOpen = !this.IsModalOpen;
    if (this.IsModalOpen == true) {
      this.ShowMenu();
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
