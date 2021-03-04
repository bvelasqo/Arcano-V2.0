import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  constructor(private authServices: AuthService) {
  }

  myForm:FormGroup;  
    ngOnInit(){
         this.myForm = new FormGroup({          
               usuario: new FormControl("",[Validators.required]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
               contrasena: new FormControl("",[Validators.required])

          })
    }

    login(): void{
      this.authServices.login(this.myForm.value.usuario, this.myForm.value.contrasena).subscribe();
    }  
}
