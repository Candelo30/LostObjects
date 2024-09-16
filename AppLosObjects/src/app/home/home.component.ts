import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../service/publications/publications.service';
import { UsuariosService } from '../service/users/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../app.routes';



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
  idUser = 0;
  nombre_busqueda: string = '';
  selectedFile: File | null= null;
  base64Image : string | null = null;
  previewUrl: string | null = null;
  foto = '';

  constructor(
    private publicationService: PublicationsService,
    private userService: UsuariosService,
    private cookies: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
    const loggedInUser = this.cookies.get('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.foto = "http://localhost:8000/" + user.imagen_perfil;
      

      

      // Asignar más información del usuario
      this.idUser = user.id;

      console.log("Usuario id: ", this.idUser)


      // Llamar a otros métodos como `publications` si es necesario
      


    }

    else {
      this.router.navigate(["/login"])
    
    }
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
    this.publicationService.getData('mostrar').subscribe((data) => {
      this.publications = data;
      this.nombreUsuario = this.userService.nombreUsuario;
    });

    
    console.log(this.nombreUsuario);
  }

  onFiles(event: any): void{
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
      const reader = new FileReader();
      reader.onload = () =>{
        this.base64Image = reader.result as string;
        this.previewUrl = this.base64Image;
      };
      reader.readAsDataURL(this.selectedFile);
    }

   }


  postData(){
    const  data_publication = new FormData();
    console.log("Usuario publicacion: ", this.idUser)
    data_publication.append('nombre_usuario', this.idUser.toString());
    data_publication.append('descripcion',this.descripcion.toString());
    data_publication.append('fecha_publicacion',new Date().toISOString());
   

    if(this.selectedFile){
      data_publication.append('imagen',this.selectedFile);
    }

    if(this.descripcion !== ''){
      this.publicationService.postData('publicar', data_publication).subscribe((Response) => {
      alert("Has enviado los datos correctamente")
    }, (Error) => {
      alert("Sus datos no se han enviados correctamente")
      console.error(Error)
    });
    }
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  // buscar():void{
  // this.data
  // console.log(this.nombre_busqueda);
  
  // }
}
