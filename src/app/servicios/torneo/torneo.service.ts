import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TorneoResponse } from 'src/app/modelo/torneo/torneo';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  baseUrl = environment.urlServices + 'torneo/';

  constructor(private httpClient: HttpClient) { }

  public guardar(torneo: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', torneo);
  }

  public consultarTorneos(): Observable<TorneoResponse> {
    return this.httpClient.get<TorneoResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarTorneosbyFilters(idtorneo: number, nombre: string, modalidad: string, estado: string, fecha: Date, idclub: number): Observable<TorneoResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        idtorneo: idtorneo || 0,
        nombre: nombre || "",
        modalidad: modalidad || "",
        estado: estado || "",
        fecha: fecha || new Date(),
        idclub: idclub || 0
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<TorneoResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
 }
}
