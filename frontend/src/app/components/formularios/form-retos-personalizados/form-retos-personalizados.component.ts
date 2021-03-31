import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-retos-personalizados',
  templateUrl: './form-retos-personalizados.component.html',
  styleUrls: ['./form-retos-personalizados.component.css']
})
export class FormRetosPersonalizadosComponent implements OnInit {
  @Output() contador: EventEmitter<number> = new EventEmitter<number>();
  retos: number
  constructor(private router: Router) { this.retos = 0 }

  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      descripcion: new FormControl("", [Validators.required])
    })
  }

  guardar() {
    //TODO
    this.contador.emit(++this.retos)
  }

}
