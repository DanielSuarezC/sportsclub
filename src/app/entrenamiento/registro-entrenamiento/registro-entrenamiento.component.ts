import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { Entrenador } from 'src/app/modelo/entrenador/entrenador';
import { Entrenamiento } from 'src/app/modelo/entrenamiento/entrenamiento';
import { EntrenamientoService } from 'src/app/servicios/entrenamiento/entrenamiento.service';
import { EntrenadorService } from 'src/app/servicios/usuarios/entrenador/entrenador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-entrenamiento',
  templateUrl: './registro-entrenamiento.component.html',
  styleUrls: ['./registro-entrenamiento.component.css']
})
export class RegistroEntrenamientoComponent {
  datoMaestro: Entrenamiento = new Entrenamiento();
  entrenadores: Entrenador[] = [];

  form1: FormGroup;
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private entrenadorService: EntrenadorService,private service:EntrenamientoService,private fb: FormBuilder, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['usuario'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.identrenamiento = 0;
    this.datoMaestro.tipo = this.form1.get('tipo')?.value;
    this.datoMaestro.jornada = this.form1.get('jornada')?.value;
    this.datoMaestro.ent_cedula = this.form1.get('ent_cedula')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;



    this.service.guardar(this.datoMaestro).pipe().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Club guardado', 'Entrenamiento Guardado: Información guardada correctamente', 'success')
        this.form1.reset(); // Reiniciar el formulario
      },
      error: (err) => {
        console.error('Error al registrar el entrenamiento:', err);
        this.dialog.open(MensajeComponent, {
          data: {
            titulo: 'Error',
            mensaje: 'Error al registrar entrenamiento. ' + Response.error, textoBoton: 'Aceptar'
          }
        });
      }
    }
    );
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


  ngOnInit(): void {
    this.form1 = this.fb.group({
      identrenamiento: ['',Validators.required],
      tipo: [''],
      jornada: [''],
      ent_cedula: ['', Validators.required],
      estado: ['']

    });

    this.consultarEntrenadores();
  }


  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }


}
