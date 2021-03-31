import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Salas } from 'src/app/Models/salas';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-form-crear-salas',
  templateUrl: './form-crear-salas.component.html',
  styleUrls: ['./form-crear-salas.component.css']
})
export class FormCrearSalasComponent implements OnInit {

  salas: string[];
  idPartida: any;
  constructor(private router: Router, private rutaActiva: ActivatedRoute, private gameService: GameService) {
    this.salas = [];
    console.log(this.rutaActiva.snapshot.params.id);
    this.idPartida = this.rutaActiva.snapshot.params.id
  }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      sala: new FormControl("", [Validators.minLength(3)])
    })

  }
  volver() {
    this.router.navigate(['forminfopartida']);
  }
  agregar() {
    if (this.salas.indexOf(this.myForm.value.sala) === -1) {
      this.salas.push(this.myForm.value.sala);

    }
    console.log(this.salas);

  }

  continuar() {
    if (this.salas.length != 0) {

      this.salas.forEach(x => {
        var sala = {
          id_sala:0,
          id_partida: this.idPartida,
          sala: x,
          orden: this.salas.indexOf(x)+1
        }
        console.log(sala);
        this.gameService.saveRoom(sala).subscribe((msg) => {
          console.log(msg);
        })
      });
      this.router.navigate(['formcrearretos', this.idPartida]);
    }
  }

  delete(item: string) {
    this.removeItemFromArr(item);
    console.log(this.salas);

  }

  removeItemFromArr(item) {
    var i = this.salas.indexOf(item);

    if (i !== -1) {
      this.salas.splice(i, 1);
    }
  }

}
