import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent {

  titulo: string;
  mensaje: string;
  textoBoton: string;
  constructor(public dialogRef: MatDialogRef<MensajeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.titulo = data.titulo;
    this.mensaje = data.mensaje;
    if (data.textoBoton !== '') {
      this.textoBoton = data.textoBoton;
    } else {
      this.textoBoton = 'Aceptar';
    }
  }

  ngOnInit(): void {
    
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
