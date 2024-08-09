import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../service/users/usuarios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  TodosLosDatos: any[] = [];

  newUser = {
    nombre: '',
    apellidos: '',
    edad: '',
    telefono: '',
    ubicacion: '',
    correo: '',
    contrasena: '',
  };

  getData() {
    this.userService.getData('api/usuario').subscribe((data) => {
      this.TodosLosDatos = data;
      console.log(this.TodosLosDatos);
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.addUser('api/usuario', this.newUser).subscribe(
        (Response) => {
          alert('Has hecho el registro con éxito');
          this.router.navigate(['/login']);
        },
        (Error) => {
          alert('Hay un error');
        }
      );
    }
  }
}
