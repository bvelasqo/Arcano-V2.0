import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  constructor() { }

  myForm:FormGroup;  
    ngOnInit(){
         this.myForm = new FormGroup({          
               usuario: new FormControl("",[Validators.required]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
               pass: new FormControl("",[Validators.required])

          })
    }
}
