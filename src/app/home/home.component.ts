import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../service/publications/publications.service';
import { UsuariosService } from '../service/users/usuarios.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Estos son los datos que tienes que crear en API o base de datos ! Para las Publicaciones

  nombreUsuario = '';
  descripcion : string = '';
  imagen : string = '';
  nombre_busqueda: string = '';

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
    this.publicationService.getData('publication').subscribe((data) => {
      this.publications = data;
    });

    this.nombreUsuario = this.userService.nombreUsuario;
    console.log(this.nombreUsuario);
  }


  postData(){
    const  data_publication = {
      usuario: this.nombreUsuario,
      comentarios: '0',
      me_gusta: '0',
      compartidos: '0',
      imagen:this.imagen,
      descripcion: this.descripcion,
      fecha_creacion: new Date,
    }


    this.publicationService.postData('publication', data_publication).subscribe((Response) => {
      alert("Has enviado los datos correctamente")
    }, (Error) => {
      alert("Sus datos no se han enviados correctamente")

    }) 
  }

  // buscar():void{
  // this.data
  // console.log(this.nombre_busqueda);
  
  // }
}
