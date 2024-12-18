import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrenamientoResponse } from 'src/app/modelo/entrenamiento/entrenamiento';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  baseUrl = environment.urlServices + 'entrenamiento/';

  constructor(private httpClient: HttpClient) { }

  public guardar(entrenamiento: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', entrenamiento);
  }

  

  public consultarEntrenamientos(): Observable<EntrenamientoResponse> {
    return this.httpClient.get<EntrenamientoResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarEntrenamientosbyFilters(identrenamiento: number, tipo: string, jornada: string, estado: string, ent_cedula: number): Observable<EntrenamientoResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        identrenamiento: identrenamiento || 0,
        tipo: tipo || "",
        jornada: jornada || "",
        estado: estado || "",
        ent_cedula: ent_cedula || 0,
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<EntrenamientoResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
 }


}
