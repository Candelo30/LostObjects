import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../service/mensajes/mensajes.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css',
})
export class MensajesComponent implements OnInit {
  constructor(private messageService: MensajesService) {}
  toggleMenu: boolean = false;

  ShowMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  TodosLosMensajes: any[] = [];

  ngOnInit(): void {
    this.getMesanjes();
  }

  getMesanjes() {
    this.messageService.getData('message').subscribe((data) => {
      this.TodosLosMensajes = data;

      console.log(this.TodosLosMensajes);
    });
  }
}
