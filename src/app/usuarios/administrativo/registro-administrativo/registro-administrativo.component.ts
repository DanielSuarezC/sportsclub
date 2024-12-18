import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Administrativo } from 'src/app/modelo/administrativo/administrativo';
import { Club } from 'src/app/modelo/club/club';
import { ClubService } from 'src/app/servicios/club/club.service';
import { AdministrativoService } from 'src/app/servicios/usuarios/administrativo/administrativo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-administrativo',
  templateUrl: './registro-administrativo.component.html',
  styleUrls: ['./registro-administrativo.component.css']
})
export class RegistroAdministrativoComponent implements OnInit{
  datoMaestro: Administrativo = new Administrativo();
  form1: FormGroup;
  clubes: Club[] = [];
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private fb: FormBuilder, private service: AdministrativoService, private clubService: ClubService , private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['administrativo'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.adm_cedula = this.form1.get('adm_cedula')?.value;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.email = this.form1.get('email')?.value;
    this.datoMaestro.telefono = this.form1.get('telefono')?.value;
    this.datoMaestro.cargo = this.form1.get('cargo')?.value;
    this.datoMaestro.sueldo = this.form1.get('sueldo')?.value;
    this.datoMaestro.idclub = this.form1.get('idclub')?.value;
    this.datoMaestro.estado = this.form1.get('estado')?.value;


    this.service.guardar(this.datoMaestro).pipe().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Administrativo guardado', 'Información guardada correctamente', 'success')
        this.form1.reset(); // Reiniciar el formulario
      },
      error: (err) => {
        console.error('Error al registrar el administrativo:', err);
        this.dialog.open(MensajeComponent, {
          data: {
            titulo: 'Error',
            mensaje: 'Error al registrar administrativo. ' + Response.error, textoBoton: 'Aceptar'
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
      adm_cedula: [''],
      nombre: [''],
      email: [''],
      telefono: [''],
      cargo: [''],
      sueldo: [''],
      idclub: [''],
      estado: ['']
    });

    this.consultarClubes();

    if(this.datoMaestro.adm_cedula){
      this.form1.get('adm_cedula')?.disable();
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

  llenarCampos(row?: Administrativo) {
  
    this.form1.patchValue({
      adm_cedula: row?.adm_cedula  || '',
      nombre: row?.nombre  || '',
      email: row?.email || '',
      telefono: row?.telefono  || '',
      cargo: row?.cargo  || '',
      sueldo: row?.sueldo  || '',
      idclub: row?.idclub  || '',
      estado:row?.estado  || ''
    });

    
  }

}
