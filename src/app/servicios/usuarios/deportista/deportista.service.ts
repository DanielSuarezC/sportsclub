import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeportistaResponse } from 'src/app/modelo/deportista/deportista';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {

  baseUrl = environment.urlServices + 'deportista/';

  constructor(private httpClient: HttpClient) { }

  public guardar(deportista: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', deportista);
  }

  public consultarDeportistas(): Observable<DeportistaResponse> {
    return this.httpClient.get<DeportistaResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarDeportistasbyFilters(dep_cedula: number, nombre: string, categoria: string, estado: string,idclub: number): Observable<DeportistaResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        dep_cedula: dep_cedula || 0,
        nombre: nombre || "",
        categoria: categoria || "",
        estado: estado || "",
        idclub: idclub || 0
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<DeportistaResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
 }
}
