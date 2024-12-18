import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeportistaEntrenamientoResponse } from 'src/app/modelo/deportista_entrenamiento/deportista-entrenamiento';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeportistaEntrenamientoService {

  baseUrl = environment.urlServices + 'deportista_entrenamiento/';

  constructor(private httpClient: HttpClient) { }

  public guardar(dato: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', dato);
  }

  public consultarAll(): Observable<DeportistaEntrenamientoResponse> {
    return this.httpClient.get<DeportistaEntrenamientoResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarDeportistasInscritos(id: string): Observable<DeportistaEntrenamientoResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        identrenamiento: id
    };

    console.log('identrenamiento del service: '+ id);

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<DeportistaEntrenamientoResponse>(
        this.baseUrl + 'getDeportistaInscritos.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
  }

  public consultarDeportistasNoInscritos(id: string): Observable<DeportistaEntrenamientoResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        identrenamiento: id
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<DeportistaEntrenamientoResponse>(
        this.baseUrl + 'getDeportistaNoInscritos.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
  }
}
