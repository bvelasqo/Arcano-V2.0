import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-info-partida-form',
  templateUrl: './info-partida-form.component.html',
  styleUrls: ['./info-partida-form.component.css']
})
export class InfoPartidaFormComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      nombre: new FormControl("", [Validators.required]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
      tematica: new FormControl("", [Validators.required]),
      descripcion: new FormControl("", [Validators.required])
    })
  }
  volver() {
    this.router.navigate(['menu']);
  }
  continuar() {
    console.log(this.myForm.value);
    this.gameService.saveGame(this.myForm.value).subscribe((msg) => {
      console.log(msg);
      console.log(msg.gameToken);
      console.log( msg.id_partida);


      localStorage.setItem("gameToken", msg.gameToken)

      this.router.navigate(['formcrearsalas', msg.id_partida]);
    });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
  save(): void {

  }
}
