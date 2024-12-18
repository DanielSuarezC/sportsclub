import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/modelo/reunion/reunion';

@Component({
  selector: 'app-registro-reunion',
  templateUrl: './registro-reunion.component.html',
  styleUrls: ['./registro-reunion.component.css']
})
export class RegistroReunionComponent implements OnInit{
  datoMaestro: Reunion = new Reunion();
  form1: FormGroup;
  // @BlockUI() blockUI: NgBlockUI;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datoMaestro = navigation.extras.state['usuario'];
    }
  }
  // constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private dialog: MatDialog, private route: Router, private changeDetectorRef: ChangeDetectorRef) {
  //   const navigation = this.route.getCurrentNavigation();
  //   if (navigation?.extras.state) {
  //     this.datoMaestro = navigation.extras.state['usuario'];
  //   }
  // }

  guardar(): void {
    // this.blockUI.start();
    // this.datoMaestro.identificacion = this.form1.get('identificacion')?.value;
    // this.datoMaestro.nombres = this.form1.get('nombres')?.value;
    // this.datoMaestro.apellidos = this.form1.get('apellidos')?.value;
    // this.datoMaestro.clave = this.form1.get('clave')?.value;
    // this.datoMaestro.sexo = this.form1.get('sexo')?.value;
    // this.datoMaestro.direccion = this.form1.get('direccion')?.value;
    // this.datoMaestro.telefono1 = this.form1.get('telefono1')?.value;
    // this.datoMaestro.telefono2 = this.form1.get('telefono2')?.value;
    // this.datoMaestro.celular = this.form1.get('celular')?.value;
    // this.datoMaestro.estrato = this.form1.get('estrato')?.value;
    // this.datoMaestro.email = this.form1.get('email')?.value;
    // this.datoMaestro.estado = this.form1.get('estado')?.value;
    // this.datoMaestro.observaciones = this.form1.get('observaciones')?.value;
    // this.datoMaestro.fechaIngreso = this.form1.get('fechaIngreso')?.value;
    // this.datoMaestro.fechaRetiro = this.form1.get('fechaRetiro')?.value;
    // this.datoMaestro.fechaNacimiento = this.form1.get('fechaNacimiento')?.value;
    // this.datoMaestro.cargo = this.form1.get('cargo')?.value;
    // this.datoMaestro.rol = this.form1.get('rol')?.value;
    // this.datoMaestro.origenCedula = this.form1.get('origenCedula')?.value;
    // this.datoMaestro.ciudad = this.form1.get('ciudad')?.value;
    // this.datoMaestro.tipoDocumento = this.form1.get('tipoDocumento')?.value;
    // this.datoMaestro.entidadSalud = this.form1.get('entidadSalud')?.value;
    // this.datoMaestro.entidadPension = this.form1.get('entidadPension')?.value;
    // this.datoMaestro.arl = this.form1.get('arl')?.value;
    // this.datoMaestro.numero = this.form1.get('numero')?.value;
    // this.datoMaestro.tipoContrato = this.form1.get('tipoContrato')?.value;

    // this.usuarioService.guardarUsuario(this.datoMaestro).pipe().subscribe((value: RespuestaGenerica) => {
    //   if (value.isError === 'S') {
    //     this.blockUI.stop();
    //     this.dialog.open(MensajeComponent, {
    //       data: {
    //         titulo: 'Error',
    //         mensaje: 'Error de validación. ' + value.message, textoBoton: 'Aceptar'
    //       }
    //     });
    //   } else {
    //     this.blockUI.stop();
    //     Swal.fire('Usuario guardado', 'Información guardada correctamente', 'success')
    //     console.log(value);
    //   }
    // },
    //   error => {
    //     this.blockUI.stop();
    //     this.dialog.open(MensajeComponent, {
    //       data: {
    //         titulo: 'Error',
    //         mensaje: 'Error de validación. ' + error.error.message, textoBoton: 'Aceptar'
    //       }
    //     });
    //   }
    // );
  }

  ngOnInit(): void {
    this.form1 = this.fb.group({
      id: [''],
      fechaModificacion: [''],
      idUsuarioModificacion: [''],
      identificacion: ['', [Validators.required, Validators.minLength(10)]],
      codigo: [''],
      nombres: ['', Validators.required],
      apellidos: [''],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      sexo: [''],
      direccion: [''],
      telefono1: [''],
      telefono2: [''],
      celular: ['', Validators.required],
      estrato: [''],
      email: ['', [Validators.required, Validators.email]],
      estado: [''],
      observaciones: [''],
      fechaIngreso: [''],
      fechaRetiro: [''],
      fechaNacimiento: [''],
      cargo: [''],
      rol: [''],
      origenCedula: [''],
      ciudad: [''],
      tipoDocumento: [''],
      entidadSalud: [''],
      entidadPension: [''],
      arl: [''],
      numero: [''],
      tipoContrato: [''],
      valorHora: [''],
      fechaUltimoPago: [''],
      periodoPagado: [''],
      fechaVencimientoPago: [''],
      valorPagado: [''],
      iddependencia:  ['']
    });

    // if (this.datoMaestro.id) {
    //   this.form1.get('clave')?.disable();
    // }
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.llenarCamposUsuarios(this.datoMaestro);
  //   });
  // }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched

  }

  // llenarCamposUsuarios(row?: Usuario) {
  
  //   this.form1.patchValue({
  //     id: row?.id || '',
  //     fechaModificacion: row?.fechaModificacion || '',
  //     idUsuarioModificacion: row?.idUsuarioModificacion || '',
  //     identificacion: row?.identificacion || '',
  //     codigo: row?.codigo || '',
  //     nombres: row?.nombres || '',
  //     apellidos: row?.apellidos || '',
  //     clave: [''],
  //     sexo: row?.sexo || '',
  //     direccion: row?.direccion || '',
  //     telefono1: row?.telefono1 || '',
  //     telefono2: row?.telefono2 || '',
  //     celular: row?.celular || '',
  //     estrato: row?.estrato || '',
  //     email: row?.email || '',
  //     estado: row?.estado || '',
  //     observaciones: row?.observaciones || '',
  //     fechaIngreso: row?.fechaIngreso || '',
  //     fechaRetiro: row?.fechaRetiro || '',
  //     fechaNacimiento: row?.fechaNacimiento || '',
  //     cargo: row?.cargo || '',
  //     rol: row?.rol || '',
  //     origenCedula: row?.origenCedula || '',
  //     ciudad: row?.ciudad || '',
  //     tipoDocumento: row?.tipoDocumento || '',
  //     entidadSalud: row?.entidadSalud || '',
  //     entidadPension: row?.entidadPension || '',
  //     arl: row?.arl || '',
  //     numero: row?.numero || '',
  //     tipoContrato: row?.tipoContrato || '',
  //     valorHora: row?.valorHora || '',
  //     fechaUltimoPago: row?.fechaUltimoPago || '',
  //     periodoPagado: row?.periodoPagado || '',
  //     fechaVencimientoPago: row?.fechaVencimientoPago || '',
  //     valorPagado: row?.valorPagado || ''
  //   });
  // }

}
