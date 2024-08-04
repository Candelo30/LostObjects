import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/users/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private userService: UsuariosService, private router: Router) {}
  username: string = '';
  password: string = '';
  ngOnInit(): void {
    this.getData();
  }

  TodosLosDatos: any[] = [];

  getData() {
    this.userService.getData('usuarios').subscribe((data) => {
      this.TodosLosDatos = data;
      console.log(this.TodosLosDatos);
    });
  }

  onSubmit() {
    const user = this.TodosLosDatos.find(
      (user) =>
        user.nombre === this.username && user.contrasena === this.password
    );
    if (user) {
      alert('Sus datos son correctos');
      this.router.navigate(['/home']);

      user.nombre = this.userService.nombreUsuario;
    } else {
      alert('Sus datos son incorrectos');
    }
  }
}
