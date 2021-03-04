import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HomeComponent } from './components/home/home.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';

const routes: Routes = [{path: "home", component: HomeComponent},
{path: "nosotros", component: NosotrosComponent},
{path: "instrucciones", component: InstruccionesComponent},
{path:"**", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
