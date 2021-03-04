import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HomeComponent } from './components/home/home.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { FormLoginComponent } from './components/formularios/form-login/form-login.component';
import { FormSignupComponent } from './components/formularios/form-signup/form-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NosotrosComponent,
    HomeComponent,
    InstruccionesComponent,
    FormLoginComponent,
    FormSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
