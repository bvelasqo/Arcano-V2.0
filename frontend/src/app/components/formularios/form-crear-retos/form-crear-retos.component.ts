import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-crear-retos',
  templateUrl: './form-crear-retos.component.html',
  styleUrls: ['./form-crear-retos.component.css']
})
export class FormCrearRetosComponent implements OnInit {

  opMultiple: Boolean = true
  opMultipleRetos: number = 0
  personalizadoRetos: number = 0
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeCountPersonalizado(retos) {
    this.personalizadoRetos = retos
  }
  changeCountOp(retos) {
    this.opMultipleRetos = retos
  }
  change() {
    this.opMultiple = !this.opMultiple
  }

  volver() {
    this.router.navigate(['formcrearsalas']);
  }
  continuar() {
    this.router.navigate(['formjugadores']);
  }

}
