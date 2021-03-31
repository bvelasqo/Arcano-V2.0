import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OptionsService } from 'src/app/services/options.service';
import { Generos } from 'src/app/Models/options';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user';


@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {
  errors: boolean;
  generos$: Observable<Generos[]>;

  constructor(private authServices: AuthService, private OptionsService: OptionsService) { this.errors = false; }

  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      usuario: new FormControl("", [Validators.required]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      documento: new FormControl("", [Validators.required]),
      genero: new FormControl("", [Validators.required]),
      pass1: new FormControl("", [Validators.required]),
      contrasena: new FormControl("", [Validators.required]),
    })
    this.generos$ = this.getGeneros();
    console.log(this.generos$);
  }
  getGeneros(): Observable<Generos[]> {
    return this.OptionsService.getGeneros();
  }
  signUp(): void {
    if (this.myForm.value.pass1 === this.myForm.value.contrasena) {
      console.log(this.myForm.value);
      this.authServices.signUp(this.myForm.value).subscribe((msg) => {
        console.log(msg);
        localStorage.setItem("token", msg.token)
        window.location.reload();
      });
    } else {
      this.errors = true;
    }
  }
}
