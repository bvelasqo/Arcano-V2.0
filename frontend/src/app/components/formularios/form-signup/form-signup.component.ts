import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {
  errors:boolean;

  constructor(private authServices: AuthService) { this.errors= false;}

  myForm:FormGroup;  
  ngOnInit(){
       this.myForm = new FormGroup({          
             nombre: new FormControl("",[Validators.required]),
             usuario: new FormControl("",[Validators.required]),
             correo: new FormControl("",[Validators.required,Validators.email]),
             documento: new FormControl("",[Validators.required]),
             genero: new FormControl("",[Validators.required]),
             pais: new FormControl("",[Validators.required]),
             fecha_nacimiento: new FormControl("",[Validators.required]),
             pass1: new FormControl("",[Validators.required]),
             contrasena: new FormControl("",[Validators.required]),
        })
  }
  signUp(): void{
    console.log(this.myForm.value);
    this.authServices.signUp(this.myForm.value).subscribe((msg) => console.log(msg));
    if(this.myForm.value.pass1!==this.myForm.value.pass2){
      this.errors=true;
    }
  }

}
