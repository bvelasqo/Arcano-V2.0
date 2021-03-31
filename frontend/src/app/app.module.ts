import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './services/auth-interceptor.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HomeComponent } from './components/home/home.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { FormLoginComponent } from './components/formularios/form-login/form-login.component';
import { FormSignupComponent } from './components/formularios/form-signup/form-signup.component';
import { MenuComponent } from './components/menu/menu.component';
import { InfoPartidaFormComponent } from './components/formularios/info-partida-form/info-partida-form.component';
import { FormCrearSalasComponent } from './components/formularios/form-crear-salas/form-crear-salas.component';
import { FormCrearRetosComponent } from './components/formularios/form-crear-retos/form-crear-retos.component';
import { FormRetosComponent } from './components/formularios/form-retos/form-retos.component';
import { FormRetosPersonalizadosComponent } from './components/formularios/form-retos-personalizados/form-retos-personalizados.component';
import { FormJugadoresComponent } from './components/formularios/form-jugadores/form-jugadores.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NosotrosComponent,
    HomeComponent,
    InstruccionesComponent,
    FormLoginComponent,
    FormSignupComponent,
    MenuComponent,
    InfoPartidaFormComponent,
    FormCrearSalasComponent,
    FormCrearRetosComponent,
    FormRetosComponent,
    FormRetosPersonalizadosComponent,
    FormJugadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
