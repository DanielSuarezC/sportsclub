import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { Entrenador } from 'src/app/modelo/entrenador/entrenador';
import { ClubService } from 'src/app/servicios/club/club.service';
import { EntrenadorService } from 'src/app/servicios/usuarios/entrenador/entrenador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.css']
})
export class RegistroEntrenadorComponent implements OnInit{
  datoMaestro: Entrenador = new Entrenador();
  form1: FormGroup;
  clubes: Club[] = [];
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private service: EntrenadorService,private clubService: ClubService,private fb: FormBuilder, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['entrenador'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.ent_cedula = this.form1.get('ent_cedula')?.value;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.email = this.form1.get('email')?.value;
    this.datoMaestro.telefono = this.form1.get('telefono')?.value;
    this.datoMaestro.elo = this.form1.get('elo')?.value;
    this.datoMaestro.tituloFide = this.form1.get('tituloFide')?.value;
    this.datoMaestro.sueldo = this.form1.get('sueldo')?.value;
    this.datoMaestro.idclub = this.form1.get('idclub')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;


    this.service.guardar(this.datoMaestro).pipe().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Entrenador guardado', 'Información guardada correctamente', 'success')
        this.form1.reset(); // Reiniciar el formulario
      },
      error: (err) => {
        console.error('Error al registrar el entrenador:', err);
        this.dialog.open(MensajeComponent, {
          data: {
            titulo: 'Error',
            mensaje: 'Error al registrar entrenador. ' + Response.error, textoBoton: 'Aceptar'
          }
        });
      }
    }
    );
  }

  consultarClubes(){
    this.clubService.consultarClubes()
    .subscribe({
      next: (response) =>{
        this.clubes = response.value // Asigna los datos a dataSource
        // this.cantidadRegistros = response.value.length;
        // console.log('Datos en dataSource:', this.dataSource.data); // Verifica que se guarden correctamente
      },
      error: (err) =>{
        console.log(err);
        // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
        //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
          Swal.fire('Error','Error al mostrar los clubes. '+ err.message,'error');
      }
    });
  
}

  ngOnInit(): void {
    this.form1 = this.fb.group({
      ent_cedula: [''],
      nombre: [''],
      email: [''],
      telefono:[''],
      tituloFide:[''],
      elo: [''],
      sueldo: [''],
      idclub: [''],
      estado:['']
    });

    this.consultarClubes();

    if (this.datoMaestro.ent_cedula) {
      this.form1.get('ent_cedula')?.disable();
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.llenarCampos(this.datoMaestro);
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }

  llenarCampos(row?: Entrenador) {
  
    this.form1.patchValue({
      ent_cedula: row?.ent_cedula  || '',
      nombre: row?.nombre  || '',
      email: row?.email  || '',
      telefono:row?.telefono  || '',
      tituloFide:row?.tituloFide  || '',
      elo: row?.elo  || '',
      sueldo: row?.sueldo || '',
      idclub: row?.idclub  || '',
      estado:row?.estado  || ''
    });
  }

}
