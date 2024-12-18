import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Club } from 'src/app/modelo/club/club';
import { Entrenador } from 'src/app/modelo/entrenador/entrenador';
import { ClubService } from 'src/app/servicios/club/club.service';
import { EntrenadorService } from 'src/app/servicios/usuarios/entrenador/entrenador.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-entrenador',
  templateUrl: './lista-entrenador.component.html',
  styleUrls: ['./lista-entrenador.component.css']
})
export class ListaEntrenadorComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'cedula', 'email','telefono','titulo','elo','sueldo','club','estado','icon'];
  dataSource: MatTableDataSource<Entrenador> =  new MatTableDataSource();
  cantidadRegistros: number;
  clubes: Club[] = [];
  
  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: EntrenadorService,private clubService: ClubService,private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      ent_cedula: [''],
      nombre: [''],
      tituloFide: [''],
      estado: [''],
      idclub: ['']
    })
    this.consultarEntrenadores();
    this.consultarClubes();
  }

  consultarEntrenadores(): void {
    // this.blockUI.start();
    let ent_cedula = this.form1.get('ent_cedula')?.value;
    let nombre = this.form1.get('nombre')?.value;
    let tituloFide = this.form1.get('tituloFide')?.value;
    let estado = this.form1.get('estado')?.value;
    let idclub = this.form1.get('idclub')?.value;

    if( ent_cedula || nombre || tituloFide || estado || idclub){
      this.consultarEntrenadoresbyFilters(  ent_cedula, nombre, tituloFide, estado,idclub);
    }else{
      this.service.consultarEntrenadores()
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
            Swal.fire('Error','Error al mostrar los usuarios. '+ err.message,'error');
        }
      });
      
    }

    
  }

  consultarEntrenadoresbyFilters(ent_cedula: number, nombre: string, tituloFide: string, estado: string,idclub: number):void{


    this.service.consultarEntrenadoressbyFilters(ent_cedula, nombre, tituloFide, estado,idclub)
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
          Swal.fire('Error','Error al mostrar los usuarios. '+ err.message,'error');
      }
    });
  }
  consultarClubes(): void {
    this.clubService.consultarClubes()
    .subscribe({
      next: (response) =>{
        this.clubes = response.value;
      },
      error: (err) =>{
        console.log(err);
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

  editar(row: Entrenador){
    const navigationExtras: NavigationExtras = {
      state: {
        entrenador: row
      }
    };
    this.route.navigate(['/registro-entrenador'], navigationExtras);
  }


}
