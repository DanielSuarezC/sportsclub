import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrenadorResponse } from 'src/app/modelo/entrenador/entrenador';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  baseUrl = environment.urlServices + 'entrenador/';

  constructor(private httpClient: HttpClient) { }

  public guardar(entrenador: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', entrenador);
  }

  public consultarEntrenadores(): Observable<EntrenadorResponse> {
    return this.httpClient.get<EntrenadorResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarEntrenadoressbyFilters(ent_cedula: number, nombre: string, tituloFide: string, estado: string,idclub: number): Observable<EntrenadorResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        ent_cedula: ent_cedula || 0,
        nombre: nombre || "",
        tituloFide: tituloFide || "",
        estado: estado || "",
        idclub: idclub || 0
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<EntrenadorResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
 }
}
