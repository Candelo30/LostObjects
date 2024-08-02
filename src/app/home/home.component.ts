import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Estos son los datos que tienes que crear en API o base de datos ! Para las Publicaciones

  publications: any = [
    {
      usuario: 'Pepito perez',
      comentarios: 10,
      me_gusta: 5,
      compartidos: 4,
      imagen:
        'https://images.unsplash.com/photo-1605143185597-9fe1a8065fbb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      descricion: 'Hola se me a perdido mi Reloj',
      fecha_creacion: '26-04-2024',
    },
  ];

  toggleMenu: boolean = false;

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
