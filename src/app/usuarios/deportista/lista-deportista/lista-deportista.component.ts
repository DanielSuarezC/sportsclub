import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Club } from 'src/app/modelo/club/club';
import { Deportista } from 'src/app/modelo/deportista/deportista';
import { ClubService } from 'src/app/servicios/club/club.service';
import { DeportistaService } from 'src/app/servicios/usuarios/deportista/deportista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-deportista',
  templateUrl: './lista-deportista.component.html',
  styleUrls: ['./lista-deportista.component.css']
})
export class ListaDeportistaComponent implements OnInit{

  displayedColumns: string[] = ['nombres', 'cedula', 'email','telefono','categoria','elo','idclub','estado','icon'];
  dataSource: MatTableDataSource<Deportista> =  new MatTableDataSource();
  cantidadRegistros: number;

  clubes: Club[] = [];
  
  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: DeportistaService, private clubService: ClubService, private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      dep_cedula: [''],
      nombre: [''],
      categoria: [''],
      estado: [''],
      idclub: ['']
    })
    this.consultarDeportista();
    this.consultarClubes();
  }

  consultarDeportista(): void {
    // this.blockUI.start();
    let dep_cedula = this.form1.get('dep_cedula')?.value;
    let nombre = this.form1.get('nombre')?.value;
    let categoria = this.form1.get('categoria')?.value;
    let estado = this.form1.get('estado')?.value;
    let idclub = this.form1.get('idclub')?.value;

    if(dep_cedula || nombre || categoria || estado || idclub){
      this.consultarDeportistasbyFilters(dep_cedula, nombre, categoria, estado, idclub);
    }else{
      this.service.consultarDeportistas()
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

  consultarDeportistasbyFilters(dep_cedula:number, nombre: string, categoria: string, estado:string, idclub:number):void{


    this.service.consultarDeportistasbyFilters(dep_cedula, nombre, categoria, estado,idclub)
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

  consultarClubes(): any {
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

  editar(row: Deportista){
    const navigationExtras: NavigationExtras = {
      state: {
        deportista: row
      }
    };
    this.route.navigate(['/registro-deportista'], navigationExtras);
  }


}