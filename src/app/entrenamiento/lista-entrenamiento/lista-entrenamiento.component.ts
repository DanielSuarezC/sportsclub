import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Club } from 'src/app/modelo/club/club';
import { Entrenador } from 'src/app/modelo/entrenador/entrenador';
import { Entrenamiento } from 'src/app/modelo/entrenamiento/entrenamiento';
import { ClubService } from 'src/app/servicios/club/club.service';
import { EntrenamientoService } from 'src/app/servicios/entrenamiento/entrenamiento.service';
import { EntrenadorService } from 'src/app/servicios/usuarios/entrenador/entrenador.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-entrenamiento',
  templateUrl: './lista-entrenamiento.component.html',
  styleUrls: ['./lista-entrenamiento.component.css']
})
export class ListaEntrenamientoComponent implements OnInit{
  displayedColumns: string[] = ['identrenamiento','tipo', 'jornada', 'ent_cedula','estado','detalles', 'icon'];
  dataSource: MatTableDataSource<Entrenamiento> =  new MatTableDataSource();
  entrenadores: Entrenador[] = [];

  cantidadRegistros: number;
  
  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: EntrenamientoService,private entrenadorService: EntrenadorService,private clubService: ClubService,private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      identrenamiento: [''],
      tipo: [''],
      jornada: [''],
      estado: [''],
      ent_cedula: [''],
    })
    this.consultarEntrenamientos();
    this.consultarEntrenadores();
  }

  consultarEntrenamientos(): void {

    let identrenamiento = this.form1.get('identrenamiento')?.value;
    let tipo = this.form1.get('tipo')?.value;
    let jornada = this.form1.get('jornada')?.value;
    let estado = this.form1.get('estado')?.value;
    let ent_cedula = this.form1.get('ent_cedula')?.value;
  
    if(identrenamiento || tipo || jornada || estado || ent_cedula){
      this.consultarEntrenamientosbyFilters(identrenamiento, tipo, jornada, estado, ent_cedula);
    }else{
      this.service.consultarEntrenamientos()
      .subscribe({
        next: (response) =>{
          this.dataSource.data = response.value; // Asigna los datos a dataSource
          // this.cantidadRegistros = response.value.length;
          console.log('Datos en dataSource:', this.dataSource.data); // Verifica que se guarden correctamente
        },
        error: (err) =>{
          console.log(err);
          // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
          //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
            Swal.fire('Error','Error al mostrar los torneos. '+ err,'error');
        }
      });
    }
  }

    
  consultarEntrenamientosbyFilters(identrenamiento: number, tipo: string, jornada: string,estado: string,ent_cedula:number):void{


    this.service.consultarEntrenamientosbyFilters(identrenamiento, tipo, jornada, estado, ent_cedula)
    .subscribe({
      next: (response) =>{
        console.log('Response: '+ response.value);
        this.dataSource.data = response.value;
        // this.cantidadRegistros = response.value.length;
        console.log('Datos en dataSource:', this.dataSource.data); // Verifica que se guarden correctamente
        this.form1.reset();
      },
      error: (err) =>{
        console.log(err);
        // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
        //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
          Swal.fire('Error','Error al mostrar los usuarios. '+ err.message,'error');
      }
    });
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
          Swal.fire('Error','Error al mostrar los clubes. '+ err.message,'error');
      }
    }); 
}


  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: Entrenamiento){
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: row
      }
    };
    this.route.navigate(['/'], navigationExtras);
  }

  detalles(row: Entrenamiento){
    const navigationExtras: NavigationExtras = {
      state: {
        entrenamiento: row
      }
    };
    this.route.navigate(['/detalles-entrenamiento'], navigationExtras);
  }


}
