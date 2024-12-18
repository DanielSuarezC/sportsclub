import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Club } from 'src/app/modelo/club/club';
import { Torneo } from 'src/app/modelo/torneo/torneo';
import { ClubService } from 'src/app/servicios/club/club.service';
import { TorneoService } from 'src/app/servicios/torneo/torneo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-torneo',
  templateUrl: './lista-torneo.component.html',
  styleUrls: ['./lista-torneo.component.css']
})
export class ListaTorneoComponent implements OnInit{
  displayedColumns: string[] = ['idtorneo','nombre','fecha','modalidad','club','estado', 'detalles','icon'];
  dataSource: MatTableDataSource<Torneo> =  new MatTableDataSource();
  cantidadRegistros: number;
  clubes: Club[] = [];

  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TorneoService,private clubService: ClubService,private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      idtorneo: [''],
      fecha: [''],
      nombre: [''],
      modalidad: [''],
      estado: [''],
      idclub: ['']
    })
    this.consultarTorneos();
    this.consultarClubes();
  }

  consultarTorneos(): void {
    // this.blockUI.start();
    let idtorneo = this.form1.get('idtorneo')?.value;
    let nombre = this.form1.get('nombre')?.value;
    let modalidad = this.form1.get('modalidad')?.value;
    let estado = this.form1.get('estado')?.value;
    let fecha = this.form1.get('fecha')?.value;
    let idclub = this.form1.get('idclub')?.value;

    if(idtorneo || nombre || modalidad || estado || fecha || idclub){
      this.consultarTorneosbyFilters(idtorneo, nombre, modalidad, estado, fecha, idclub);
    }else{
      this.service.consultarTorneos()
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

  consultarTorneosbyFilters(idtorneo: number, nombre: string, modalidad:string, estado: string, fecha: Date, idclub:number):void{


    this.service.consultarTorneosbyFilters(idtorneo, nombre, modalidad, estado, fecha, idclub)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: Torneo){
    const navigationExtras: NavigationExtras = {
      state: {
        torneo: row
      }
    };
    this.route.navigate(['/registro-torneo'], navigationExtras);
  }

  detalles(row: Torneo){
    const navigationExtras: NavigationExtras = {
      state: {
        torneo: row
      }
    };
    this.route.navigate(['/detalles-torneo'], navigationExtras);
  }


}
