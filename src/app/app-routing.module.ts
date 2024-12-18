import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListaAdministrativoComponent } from './usuarios/administrativo/lista-administrativo/lista-administrativo.component';
import { ListaDeportistaComponent } from './usuarios/deportista/lista-deportista/lista-deportista.component';
import { ListaEntrenadorComponent } from './usuarios/entrenador/lista-entrenador/lista-entrenador.component';
import { ListaClubComponent } from './club/lista-club/lista-club.component';
import { ListaTorneoComponent } from './torneo/lista-torneo/lista-torneo.component';
import { ListaEntrenamientoComponent } from './entrenamiento/lista-entrenamiento/lista-entrenamiento.component';
import { ListaReunionComponent } from './reunion/lista-reunion/lista-reunion.component';
import { RegistroAdministrativoComponent } from './usuarios/administrativo/registro-administrativo/registro-administrativo.component';
import { RegistroDeportistaComponent } from './usuarios/deportista/registro-deportista/registro-deportista.component';
import { RegistroClubComponent } from './club/registro-club/registro-club.component';
import { RegistroEntrenadorComponent } from './usuarios/entrenador/registro-entrenador/registro-entrenador.component';
import { RegistroTorneoComponent } from './torneo/registro-torneo/registro-torneo.component';
import { RegistroEntrenamientoComponent } from './entrenamiento/registro-entrenamiento/registro-entrenamiento.component';
import { RegistroReunionComponent } from './reunion/registro-reunion/registro-reunion.component';
import { DetallestorneoComponent } from './torneo/detallestorneo/detallestorneo.component';
import { DetallesEntrenamientoComponent } from './entrenamiento/detalles-entrenamiento/detalles-entrenamiento.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent  
  },
  {
    path: 'lista-administrativo',
    component: ListaAdministrativoComponent
  },
  {
    path: 'lista-deportista',
    component: ListaDeportistaComponent
  },
  {
    path: 'lista-entrenador',
    component: ListaEntrenadorComponent,
  },
  {
    path: 'lista-club',
    component: ListaClubComponent
  },
  {
    path: 'lista-torneo',
    component: ListaTorneoComponent
  },
  {
    path: 'lista-entrenamiento',
    component: ListaEntrenamientoComponent
  },
  {
    path: 'lista-reunion',
    component: ListaReunionComponent
  },
  {
    path: 'registro-administrativo',
    component: RegistroAdministrativoComponent
  },
  {
    path: 'registro-deportista',
    component: RegistroDeportistaComponent
  },
  {
    path: 'registro-club',
    component: RegistroClubComponent
  },
  {
    path: 'registro-entrenador',
    component: RegistroEntrenadorComponent
  },
  {
    path: 'registro-torneo',
    component: RegistroTorneoComponent
  },
  {
    path: 'registro-entrenamiento',
    component: RegistroEntrenamientoComponent
  },
  {
    path: 'registro-reunion',
    component: RegistroReunionComponent
  },
  {
    path: 'detalles-torneo',
    component: DetallestorneoComponent
  },
  {
    path: 'detalles-entrenamiento',
    component: DetallesEntrenamientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
