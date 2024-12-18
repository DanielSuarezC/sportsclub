import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { CookieService} from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from  '@angular/material/table' ;
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AutorizacionInterceptor } from './servicios/autorizacion/autorizacion.interceptor';
import { ListaAdministrativoComponent } from './usuarios/administrativo/lista-administrativo/lista-administrativo.component';
import { ListaDeportistaComponent } from './usuarios/deportista/lista-deportista/lista-deportista.component';
import { ListaEntrenadorComponent } from './usuarios/entrenador/lista-entrenador/lista-entrenador.component';
import { ListaClubComponent } from './club/lista-club/lista-club.component';
import { ListaTorneoComponent } from './torneo/lista-torneo/lista-torneo.component';
import { ListaEntrenamientoComponent } from './entrenamiento/lista-entrenamiento/lista-entrenamiento.component';
import { ListaReunionComponent } from './reunion/lista-reunion/lista-reunion.component';
import { RegistroAdministrativoComponent } from './usuarios/administrativo/registro-administrativo/registro-administrativo.component';
import { RegistroDeportistaComponent } from './usuarios/deportista/registro-deportista/registro-deportista.component';
import { RegistroEntrenadorComponent } from './usuarios/entrenador/registro-entrenador/registro-entrenador.component';
import { RegistroClubComponent } from './club/registro-club/registro-club.component';
import { RegistroTorneoComponent } from './torneo/registro-torneo/registro-torneo.component';
import { RegistroEntrenamientoComponent } from './entrenamiento/registro-entrenamiento/registro-entrenamiento.component';
import { RegistroReunionComponent } from './reunion/registro-reunion/registro-reunion.component';
import { MensajeComponent } from './componentes/mensaje/mensaje.component';
import { DetallestorneoComponent } from './torneo/detallestorneo/detallestorneo.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DetallesEntrenamientoComponent } from './entrenamiento/detalles-entrenamiento/detalles-entrenamiento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    LoginComponent,
    InicioComponent,
    ListaAdministrativoComponent,
    ListaDeportistaComponent,
    ListaEntrenadorComponent,
    ListaClubComponent,
    ListaTorneoComponent,
    ListaEntrenamientoComponent,
    ListaReunionComponent,
    RegistroAdministrativoComponent,
    RegistroDeportistaComponent,
    RegistroEntrenadorComponent,
    RegistroClubComponent,
    RegistroTorneoComponent,
    RegistroEntrenamientoComponent,
    RegistroReunionComponent,
    MensajeComponent,
    DetallestorneoComponent,
    DetallesEntrenamientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AutorizacionInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
