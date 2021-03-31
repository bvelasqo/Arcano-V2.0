import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-form-retos',
  templateUrl: './form-retos.component.html',
  styleUrls: ['./form-retos.component.css']
})
export class FormRetosComponent implements OnInit {
  @Output() contador: EventEmitter<number> = new EventEmitter<number>();
  retos: number
  constructor(private router: Router,private rutaActiva: ActivatedRoute) { this.retos = 0 }

  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      pregunta: new FormControl("", [Validators.required]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
      op1: new FormControl("", [Validators.required]),
      op2: new FormControl("", [Validators.required]),
      op3: new FormControl("", [Validators.required]),
      op4: new FormControl("", [Validators.required]),
      sala: new FormControl("", [Validators.required])

    })
  }

  guardar() {
    //TODO
    this.contador.emit(++this.retos)
  }

}
