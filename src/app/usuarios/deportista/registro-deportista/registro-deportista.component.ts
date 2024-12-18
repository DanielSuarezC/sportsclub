import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { Deportista } from 'src/app/modelo/deportista/deportista';
import { ClubService } from 'src/app/servicios/club/club.service';
import { DeportistaService } from 'src/app/servicios/usuarios/deportista/deportista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-deportista',
  templateUrl: './registro-deportista.component.html',
  styleUrls: ['./registro-deportista.component.css']
})
export class RegistroDeportistaComponent implements OnInit, AfterViewInit{
  datoMaestro: Deportista = new Deportista();
  clubes: Club[] = [];
  form1: FormGroup;
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private service: DeportistaService, private clubService: ClubService, private fb: FormBuilder, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['deportista'];
    }
  }

  ngOnInit(): void {
    this.form1 = this.fb.group({
      dep_cedula: [''],
      nombre: [''],
      email: [''],
      telefono:[''],
      categoria:[''],
      elo: [''],
      idclub: [''],
      estado:['']
    });

    this.consultarClubes();

    if (this.datoMaestro.dep_cedula) {
      this.form1.get('dep_cedula')?.disable();
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.dep_cedula = this.form1.get('dep_cedula')?.value;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.email = this.form1.get('email')?.value;
    this.datoMaestro.telefono = this.form1.get('telefono')?.value;
    this.datoMaestro.categoria = this.form1.get('categoria')?.value;
    this.datoMaestro.elo = this.form1.get('elo')?.value;
    this.datoMaestro.idclub = this.form1.get('idclub')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;


    this.service.guardar(this.datoMaestro).pipe().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Deportista guardado', 'Información guardada correctamente', 'success')
        this.form1.reset(); // Reiniciar el formulario
      },
      error: (err) => {
        console.error('Error al registrar el deportista:', err);
        this.dialog.open(MensajeComponent, {
          data: {
            titulo: 'Error',
            mensaje: 'Error al registrar deportista. ' + Response.error, textoBoton: 'Aceptar'
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.llenarCampos(this.datoMaestro);
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }

  llenarCampos(row?: Deportista) {
  
    this.form1.patchValue({
      dep_cedula: row?.dep_cedula  || '',
      nombre: row?.nombre  || '',
      email: row?.email  || '',
      telefono:row?.telefono  || '',
      categoria:row?.categoria  || '',
      elo: row?.elo  || '',
      idclub: row?.idclub  || '',
      estado:row?.estado  || ''
    });
    // this.form1.get('dep_cedula')?.disable();
  }


}