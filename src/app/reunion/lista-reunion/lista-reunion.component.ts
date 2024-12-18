import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Reunion } from 'src/app/modelo/reunion/reunion';


@Component({
  selector: 'app-lista-reunion',
  templateUrl: './lista-reunion.component.html',
  styleUrls: ['./lista-reunion.component.css']
})
export class ListaReunionComponent implements OnInit{
  displayedColumns: string[] = ['nombres', 'identificacion', 'rol','estado','icon'];
  dataSource: MatTableDataSource<Reunion> =  new MatTableDataSource();
  cantidadRegistros: number;
  
  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // constructor(private usuarioService: UsuariosService, private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }
  constructor(private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      nombre: [''],
      apellidos: [''],
      identificacion: [''],
      estado: [''],
      rol: ['']
    })
    this.consultarUsuarios();
  }

  consultarUsuarios(): void {
    // this.blockUI.start();
    
    const registroInicial = 0;
    const registrosPorPagina = 10;

    // this.usuarioService.consultarUsuarios(this.form1.get('nombre')?.value, this.form1.get('apellidos')?.value, this.form1.get('identificacion')?.value, this.form1.get('estado')?.value, this.form1.get('rol')?.value, registroInicial, registrosPorPagina)
    //   .subscribe((value: RespuestaGenerica) => {
    //     console.log(value);
    //     if (value.isError === 'N') {
    //       this.dataSource.data = value.datos as Usuario[];
    //       this.cantidadRegistros = value.cantidadRegistros;
    //       this.blockUI.stop();
    //     } else {
    //       //this.blockUI.stop();
    //       this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
    //       mensaje: 'Error al mostrar usuarios. ' + value.message, textoBoton: 'Aceptar' }});
    //       // Swal.fire('Error','Error al mostrar los usuarios. '+ value.message,'error');
    //     }
    //     this.blockUI.stop();
    //   }, error => {
    //     this.blockUI.stop();
    //     this.dialog.open(MensajeComponent, {data: {titulo: 'Error', mensaje: error.error.message, textoBoton: 'Aceptar' }})
    //   });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: Reunion){
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: row
      }
    };
    this.route.navigate(['/registro_administrativo'], navigationExtras);
  }

}
