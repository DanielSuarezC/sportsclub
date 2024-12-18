import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { MensajeComponent } from 'src/app/componentes/mensaje/mensaje.component';
import { Club } from 'src/app/modelo/club/club';
import { ClubService } from 'src/app/servicios/club/club.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-club',
  templateUrl: './lista-club.component.html',
  styleUrls: ['./lista-club.component.css']
})
export class ListaClubComponent implements OnInit {

  displayedColumns: string[] = ['idclub', 'nombre', 'ciudad','direccion','telefono','icon'];
  dataSource: MatTableDataSource<Club> =  new MatTableDataSource();
  cantidadRegistros: number;
  
  form1: FormGroup;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // constructor(private usuarioService: UsuariosService, private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }
  constructor(private clubService: ClubService,private fb: FormBuilder, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form1 = this.fb.group({
      idclub: [""],
      nombre: [""],
      ciudad: [""]
    })
    this.consultarClubes();
  }

  consultarClubes(): void {
    // this.blockUI.start();

    let idclub = this.form1.get('idclub')?.value;
    let nombre = this.form1.get('nombre')?.value;
    let ciudad = this.form1.get('ciudad')?.value;

    if(idclub || nombre || ciudad){
      this.consultarClubesbyFilters(idclub,nombre,ciudad);
      this.form1.reset();
    }else{
      this.clubService.consultarClubes()
      .subscribe({
        next: (response) =>{
          this.dataSource.data = response.value // Asigna los datos a dataSource
        },
        error: (err) =>{
          console.log(err);
          // this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
          //   mensaje: 'Error al mostrar clubes. ' + err, textoBoton: 'Aceptar' }});
            Swal.fire('Error','Error al mostrar los clubes. '+ err.message,'error');
        }
      });
    }
  }

  consultarClubesbyFilters(idclub: number, nombre: string,ciudad: string):void{
    this.clubService.consultarClubesbyFilters(idclub,nombre, ciudad)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: Club){
    const navigationExtras: NavigationExtras = {
      state: {
        club: row
      }
    };
    this.route.navigate(['/registro-club'], navigationExtras);
  }


}
