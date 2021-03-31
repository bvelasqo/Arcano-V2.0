import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service'
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HomeComponent } from './components/home/home.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { MenuComponent } from './components/menu/menu.component';
import { InfoPartidaFormComponent } from './components/formularios/info-partida-form/info-partida-form.component';
import { FormCrearSalasComponent } from './components/formularios/form-crear-salas/form-crear-salas.component';
import { FormCrearRetosComponent } from './components/formularios/form-crear-retos/form-crear-retos.component';
import { FormJugadoresComponent } from './components/formularios/form-jugadores/form-jugadores.component';

const routes: Routes = [{ path: "home", component: HomeComponent },
{ path: "nosotros", component: NosotrosComponent },
{ path: "instrucciones", component: InstruccionesComponent },
{ path: "menu", component: MenuComponent },
{ path: "forminfopartida", component: InfoPartidaFormComponent },
{ path: "formcrearsalas/:id", component: FormCrearSalasComponent },
{ path: "formcrearretos/:id", component: FormCrearRetosComponent },
{ path: "formjugadores/:id", component: FormJugadoresComponent },
//{path: "menu/:id", component: MenuComponent, canActivate: [AuthGuard]},
{ path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
