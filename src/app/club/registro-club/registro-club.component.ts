import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { ClubService } from 'src/app/servicios/club/club.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-club',
  templateUrl: './registro-club.component.html',
  styleUrls: ['./registro-club.component.css']
})
export class RegistroClubComponent implements OnInit,AfterViewInit{
  datoMaestro: Club = new Club();
  form1: FormGroup;
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private fb: FormBuilder, private clubService: ClubService, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['club'];
    }
  }

  guardar(): void {
    // this.blockUI.start();
    this.datoMaestro.idclub = this.form1.get('idclub')?.value;
    this.datoMaestro.nombre = this.form1.get('nombre')?.value;
    this.datoMaestro.ciudad = this.form1.get('ciudad')?.value;
    this.datoMaestro.direccion = this.form1.get('direccion')?.value;
    this.datoMaestro.telefono = this.form1.get('telefono')?.value;


    this.clubService.guardarClub(this.datoMaestro).pipe().subscribe({
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
      idclub: ['', Validators.required],
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.form1.get('idclub')?.disable();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.llenarCampos(this.datoMaestro);
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }

  llenarCampos(row?: Club) {
  
    this.form1.patchValue({
      idclub: row?.idclub || '',
      nombre: row?.nombre || '',
      ciudad: row?.ciudad || '',
      direccion: row?.direccion || '',
      telefono: row?.telefono || ''
    });
  }
}
