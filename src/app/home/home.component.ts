import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../service/publications/publications.service';
import { UsuariosService } from '../service/users/usuarios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Estos son los datos que tienes que crear en API o base de datos ! Para las Publicaciones

  nombreUsuario = '';

  constructor(
    private publicationService: PublicationsService,
    private userService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.nombreUsuario = this.userService.nombreUsuario;
  }
  publications: any = [];

  toggleMenu: boolean = false;

  IsModalOpen: boolean = false;

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  ShowModal() {
    this.IsModalOpen = !this.IsModalOpen;
    if (this.IsModalOpen == true) {
      this.ShowMenu();
    }
  }

  getData() {
    this.publicationService.getData('pubication').subscribe((data) => {
      this.publications = data;
    });

    this.nombreUsuario = this.userService.nombreUsuario;
    console.log(this.nombreUsuario);
  }
}
