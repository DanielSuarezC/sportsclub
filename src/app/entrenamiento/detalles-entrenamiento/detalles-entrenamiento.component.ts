import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Deportista } from 'src/app/modelo/deportista/deportista';
import { DeportistaEntrenamiento } from 'src/app/modelo/deportista_entrenamiento/deportista-entrenamiento';
import { Entrenador } from 'src/app/modelo/entrenador/entrenador';
import { Entrenamiento } from 'src/app/modelo/entrenamiento/entrenamiento';
import { DeportistaEntrenamientoService } from 'src/app/servicios/DeportistaEntrenamiento/deportista-entrenamiento.service';
import { EntrenamientoService } from 'src/app/servicios/entrenamiento/entrenamiento.service';
import { EntrenadorService } from 'src/app/servicios/usuarios/entrenador/entrenador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-entrenamiento',
  templateUrl: './detalles-entrenamiento.component.html',
  styleUrls: ['./detalles-entrenamiento.component.css']
})
export class DetallesEntrenamientoComponent implements OnInit,AfterViewInit {
  datoMaestro: Entrenamiento = new Entrenamiento();
  datoDeportistaEntrenamiento: DeportistaEntrenamiento = new DeportistaEntrenamiento();
  form1: FormGroup;

  entrenadores: Entrenador[] = [];

  displayedColumns: string[] = ['nombres', 'cedula', 'email','telefono','categoria','elo','identrenamiento','fecha','horainicio','horafin','icon'];
  displayedColumnsNoInscritos: string[] = ['nombres', 'cedula', 'email','telefono','categoria','elo','club','estado','icon'];
  dataSourceInscritos: MatTableDataSource<Deportista> =  new MatTableDataSource();
  dataSourceNoInscritos: MatTableDataSource<Deportista> =  new MatTableDataSource();
  cantidadRegistros: number;
  // @BlockUI() blockUI: NgBlockUI;


    constructor(private serviceDeportista_entrenamiento: DeportistaEntrenamientoService,private service: EntrenamientoService,private entrenadorService: EntrenadorService,private fb: FormBuilder,private dialog: MatDialog, private route: Router) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['entrenamiento'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.identrenamiento = this.form1.get('identrenamiento')?.value;
    this.datoMaestro.tipo = this.form1.get('tipo')?.value;
    this.datoMaestro.jornada = this.form1.get('jornada')?.value;
    this.datoMaestro.ent_cedula = this.form1.get('ent_cedula')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;

    
    this.datoDeportistaEntrenamiento.fecha = this.form1.get('fecha')?.value;
    this.datoDeportistaEntrenamiento.horainicio = this.form1.get('horainicio')?.value;
    this.datoDeportistaEntrenamiento.horafin = this.form1.get('horafin')?.value;
    this.datoDeportistaEntrenamiento.dep_cedula = 0;
    this.datoDeportistaEntrenamiento.identrenamiento = this.form1.get('identrenamiento')?.value;
    
    if(this.datoDeportistaEntrenamiento.horainicio || this.datoDeportistaEntrenamiento.horafin || this.datoDeportistaEntrenamiento.fecha){

      this.serviceDeportista_entrenamiento.guardar(this.datoDeportistaEntrenamiento).pipe().subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('Torneo editado', 'Entrenamiento editado: Información guardada correctamente'+response, 'success')
          this.consultarDeportistasInscritos();
          this.consultarDeportistasNoInscritos();
        },
        error: (err) => {
          console.error('Error al registrar el club:', err);
          this.dialog.open(MensajeComponent, {
            data: {
              titulo: 'Error',
              mensaje: 'Error al Actualizar entrenamiento. ' + err, textoBoton: 'Aceptar'
            }
          });
        } 
      });
    }else{
      this.service.guardar(this.datoMaestro).pipe().subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('Entrenamiento editado', 'Entrenamiento editado: Información guardada correctamente', 'success')
        },
        error: (err) => {
          console.error('Error al registrar el Entrenamiento:', err);
          this.dialog.open(MensajeComponent, {
            data: {
              titulo: 'Error',
              mensaje: 'Error al registrar Entrenamiento. ' + err, textoBoton: 'Aceptar'
            }
          });
        }
      }
      );
    }

  }
  ngOnInit(): void {
    this.form1 = this.fb.group({
      identrenamiento: ['', Validators.required],
      tipo: ['', Validators.required],
      jornada: ['', Validators.required],
      ent_cedula: [''],
      estado: [''],
      fecha: ['', Validators.required],
      horainicio : [''],
      horafin:['']
    });

    
    if(this.datoMaestro.identrenamiento){
      this.form1.get('identrenamiento')?.disable();
    }

    this.consultarEntrenadores();
  }

  consultarEntrenadores(){
    this.entrenadorService.consultarEntrenadores()
    .subscribe({
      next: (response) =>{
        this.entrenadores = response.value // Asigna los datos a dataSource
        // this.cantidadRegistros = response.value.length;
        // console.log('Datos en dataSource:', this.dataSource.data); // Verifica que se guarden correctamente
      },
      error: (err) =>{
        console.log(err);
        // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
        //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
          Swal.fire('Error','Error al mostrar los entrenadores. '+ err.message,'error');
      }
    });
  
}
 

  consultarDeportistasInscritos(): void {
    // this.blockUI.start();
    let identrenamiento = this.form1.get('identrenamiento')?.value;
   
      this.serviceDeportista_entrenamiento.consultarDeportistasInscritos(identrenamiento)
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
          // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
          //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
            Swal.fire('Error','Error al mostrar los deportistas. '+ err.message,'error');
        }
      });
    
  }

  consultarDeportistasNoInscritos(): void {
    // this.blockUI.start();
    let identrenamiento = this.form1.get('identrenamiento')?.value;
   
      this.serviceDeportista_entrenamiento.consultarDeportistasNoInscritos(identrenamiento)
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

  consultarUsuarios(){

  }

  llenarCampos(row?: Entrenamiento) {
  
    this.form1.patchValue({
      identrenamiento: row?.identrenamiento  || '',
      tipo: row?.tipo  || '',
      jornada: row?.jornada  || '',
      ent_cedula: row?.ent_cedula  || '',
      estado: row?.estado|| ''
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

  AgregarDeportista(row: Deportista){

     // this.blockUI.start();
     this.datoDeportistaEntrenamiento.identrenamiento = this.form1.get('identrenamiento')?.value;
     this.datoDeportistaEntrenamiento.dep_cedula= row.dep_cedula;
     this.datoDeportistaEntrenamiento.fecha= this.form1.get('fecha')?.value;
     this.datoDeportistaEntrenamiento.horainicio = this.form1.get('horainicio')?.value;
     this.datoDeportistaEntrenamiento.horafin = this.form1.get('horafin')?.value;
 
 
     this.serviceDeportista_entrenamiento.guardar(this.datoDeportistaEntrenamiento).pipe().subscribe({
       next: (response) => {
         console.log('Respuesta del servidor:', response);
         Swal.fire('Torneo guardado', 'Deportista Agregado al entrenamiento: Información guardada correctamente', 'success');
         this.consultarDeportistasInscritos();
         this.consultarDeportistasNoInscritos();
       },
       error: (err) => {
         console.error('Error al registrar:', err);
         this.dialog.open(MensajeComponent, {
           data: {
             titulo: 'Error',
             mensaje: 'Error al registrar. ' + err, textoBoton: 'Aceptar'
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
