import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TorneoDeportistaResponse } from 'src/app/modelo/torneo_deportista/torneo-deportista';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorneoDeportistaService {

  baseUrl = environment.urlServices + 'torneo_deportista/';

  constructor(private httpClient: HttpClient) { }

  public guardar(torneo_deportista: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', torneo_deportista);
  }

  public consultarAll(): Observable<TorneoDeportistaResponse> {
    return this.httpClient.get<TorneoDeportistaResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarDeportistasInscritos(id: string): Observable<TorneoDeportistaResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        idtorneo: id
    };

    console.log('idtorneo del service: '+ id);

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<TorneoDeportistaResponse>(
        this.baseUrl + 'getDeportista.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
  }

  public consultarDeportistasNoInscritos(id: string): Observable<TorneoDeportistaResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        idtorneo: id
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<TorneoDeportistaResponse>(
        this.baseUrl + 'getDeportistaNoInscrito.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
  }
}
