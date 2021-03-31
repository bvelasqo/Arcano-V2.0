import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-jugadores',
  templateUrl: './form-jugadores.component.html',
  styleUrls: ['./form-jugadores.component.css']
})
export class FormJugadoresComponent implements OnInit {

  constructor(private router: Router) { }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      sala: new FormControl("", [Validators.minLength(3)])
    })
  }
  volver() {
    this.router.navigate(['formcrearretos']);
  }
  continuar() {
    this.router.navigate(['formcrearretos']);
  }
  agregar() {

  }

}
