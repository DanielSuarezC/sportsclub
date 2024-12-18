import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { Torneo } from 'src/app/modelo/torneo/torneo';
import { ClubService } from 'src/app/servicios/club/club.service';
import { TorneoService } from 'src/app/servicios/torneo/torneo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-torneo',
  templateUrl: './registro-torneo.component.html',
  styleUrls: ['./registro-torneo.component.css']
})
export class RegistroTorneoComponent implements OnInit{
  datoMaestro: Torneo = new Torneo();
  form1: FormGroup;
  clubes: Club[] = [];
  // @BlockUI() blockUI: NgBlockUI;

    constructor(private service: TorneoService,private clubService: ClubService,private fb: FormBuilder,private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['torneo'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.idtorneo = 0;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.modalidad = this.form1.get('modalidad')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;
    this.datoMaestro.fecha = this.form1.get('fecha')?.value;
    this.datoMaestro.idclub = this.form1.get('idclub')?.value;


    this.service.guardar(this.datoMaestro).pipe().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Club guardado', 'Información guardada correctamente', 'success')
        this.form1.reset(); // Reiniciar el formulario
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

  ngOnInit(): void {
    this.form1 = this.fb.group({
      nombre: ['', Validators.required],
      modalidad: ['', Validators.required],
      estado : [''],
      fecha: ['', Validators.required],
      idclub: ['']
    });

    this.consultarClubes();

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

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.llenarCamposUsuarios(this.datoMaestro);
  //   });
  // }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }

}
