import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Torneo } from '../../modelo/torneo/torneo';
import { Deportista } from 'src/app/modelo/deportista/deportista';
import { DeportistaService } from 'src/app/servicios/usuarios/deportista/deportista.service';
import Swal from 'sweetalert2';
import { TorneoService } from 'src/app/servicios/torneo/torneo.service';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { TorneoDeportistaService } from 'src/app/servicios/torneo_deportista/torneo-deportista.service';
import { TorneoDeportista } from 'src/app/modelo/torneo_deportista/torneo-deportista';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Club } from 'src/app/modelo/club/club';

@Component({
  selector: 'app-detallestorneo',
  templateUrl: './detallestorneo.component.html',
  styleUrls: ['./detallestorneo.component.css']
})
export class DetallestorneoComponent {

  datoMaestro: Torneo = new Torneo();
  datoTorneoDeportista: TorneoDeportista = new TorneoDeportista();
  form1: FormGroup;
  clubes: Club[] = [];

  displayedColumns: string[] = ['nombres', 'cedula', 'email','telefono','categoria','elo','torneo','horainicio','horafin','icon'];
  displayedColumnsNoInscritos: string[] = ['nombres', 'cedula', 'email','telefono','categoria','elo','club','estado','icon'];
  dataSourceInscritos: MatTableDataSource<Deportista> =  new MatTableDataSource();
  dataSourceNoInscritos: MatTableDataSource<Deportista> =  new MatTableDataSource();
  cantidadRegistros: number;
  // @BlockUI() blockUI: NgBlockUI;


    constructor(private serviceTorneo_deportista: TorneoDeportistaService,private service: TorneoService,private fb: FormBuilder,private dialog: MatDialog, private route: Router) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['torneo'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.idtorneo = this.form1.get('idtorneo')?.value;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.modalidad = this.form1.get('modalidad')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;
    this.datoMaestro.fecha = this.form1.get('fecha')?.value;

    
    this.datoTorneoDeportista.idtorneo = this.form1.get('idtorneo')?.value;
    this.datoTorneoDeportista.horainicio = this.form1.get('horainicio')?.value;
    this.datoTorneoDeportista.horafin = this.form1.get('horafin')?.value;
    this.datoTorneoDeportista.dep_cedula = 0;

    if(this.datoTorneoDeportista.horainicio || this.datoTorneoDeportista.horafin ){

      this.serviceTorneo_deportista.guardar(this.datoTorneoDeportista).pipe().subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('Torneo editado', 'Información guardada correctamente', 'success')
          this.consultarDeportistasInscritos();
          this.consultarDeportistasNoInscritos();
        },
        error: (err) => {
          console.error('Error al registrar el club:', err);
          this.dialog.open(MensajeComponent, {
            data: {
              titulo: 'Error',
              mensaje: 'Error al registrar club. ' + err, textoBoton: 'Aceptar'
            }
          });
        } 
      });
    }else{
      this.service.guardar(this.datoMaestro).pipe().subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('Torneo editado', 'Torneo editado: Información guardada correctamente', 'success')
        },
        error: (err) => {
          console.error('Error al registrar el club:', err);
          this.dialog.open(MensajeComponent, {
            data: {
              titulo: 'Error',
              mensaje: 'Error al registrar club. ' + err, textoBoton: 'Aceptar'
            }
          });
        }
      }
      );
    }

  }
  ngOnInit(): void {
    this.form1 = this.fb.group({
      idtorneo: ['', Validators.required],
      nombre: ['', Validators.required],
      modalidad: ['', Validators.required],
      estado: [''],
      fecha: ['', Validators.required],
      idclub: [''],
      horainicio : [''],
      horafin:['']
    });


    if(this.datoMaestro.idtorneo){
      this.form1.get('idtorneo')?.disable();
      this.form1.get('idclub')?.disable();
    }

    
  }
 

  consultarDeportistasInscritos(): void {
    // this.blockUI.start();
    let idtorneo = this.form1.get('idtorneo')?.value;
   
      this.serviceTorneo_deportista.consultarDeportistasInscritos(idtorneo)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.dataSourceInscritos.data = response.value; // Asigna los datos a dataSource
          // this.cantidadRegistros = response.value.length;
          console.log('Datos en dataSource:', this.dataSourceInscritos.data); // Verifica que se guarden correctamente
          // this.form1.patchValue({horainicio: 'horainicio').
        },
        error: (err) =>{
          console.log(err);
            Swal.fire('Error','Error al mostrar los usuarios. '+ err.message,'error');
        }
      });
    
  }

  consultarDeportistasNoInscritos(): void {
    // this.blockUI.start();
    let idtorneo = this.form1.get('idtorneo')?.value;
   
      this.serviceTorneo_deportista.consultarDeportistasNoInscritos(idtorneo)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.dataSourceNoInscritos.data = response.value; // Asigna los datos a dataSource
          // this.cantidadRegistros = response.value.length;
          console.log('Datos en dataSource:', this.dataSourceNoInscritos.data); // Verifica que se guarden correctamente
          // this.form1.patchValue({horainicio: 'horainicio').
        },
        error: (err) =>{
          console.log(err);
          // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
          //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
            Swal.fire('Error','Error al mostrar los usuarios. '+ err.message,'error');
        }
      });
    
  }

  llenarCampos(row?: Torneo) {
  
    this.form1.patchValue({
      idtorneo: row?.idtorneo  || '',
      nombre: row?.nombre  || '',
      modalidad: row?.modalidad  || '',
      estado: row?.estado  || '',
      fecha: row?.fecha|| '',
      idclub: row?.idclub || '',
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.llenarCampos(this.datoMaestro);
      this.consultarDeportistasInscritos();
      this.consultarDeportistasNoInscritos();
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched
  }

  editar(row: Torneo){
    const navigationExtras: NavigationExtras = {
      state: {
        torneo: row
      }
    };
    this.route.navigate(['/registro-torneo'], navigationExtras);
  }

  AgregarDeportista(row: Deportista){

     // this.blockUI.start();
     this.datoTorneoDeportista.idtorneo = this.form1.get('idtorneo')?.value;
     this.datoTorneoDeportista.dep_cedula = row.dep_cedula;
     this.datoTorneoDeportista.horainicio = this.form1.get('horainicio')?.value;
     this.datoTorneoDeportista.horafin = this.form1.get('horafin')?.value;
 
 
     this.serviceTorneo_deportista.guardar(this.datoTorneoDeportista).pipe().subscribe({
       next: (response) => {
         console.log('Respuesta del servidor:', response);
         Swal.fire('Torneo guardado', 'Información guardada correctamente', 'success');
         this.consultarDeportistasInscritos();
         this.consultarDeportistasNoInscritos();
       },
       error: (err) => {
         console.error('Error al registrar el club:', err);
         this.dialog.open(MensajeComponent, {
           data: {
             titulo: 'Error',
             mensaje: 'Error al registrar club. ' + err, textoBoton: 'Aceptar'
           }
         });
       }
     }
     );

  }

  //...
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#555',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#CE93D8',
        clockFaceTimeInactiveColor: '#CE93D8'
    }
};

}
