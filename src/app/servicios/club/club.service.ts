import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club, ClubResponse } from 'src/app/modelo/club/club';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  baseUrl = environment.urlServices + 'club/';

  constructor(private httpClient: HttpClient) { }

  public guardarClub(club: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'addClub.php', club);
  }

  public consultarClubes(): Observable<ClubResponse> {
    return this.httpClient.get<ClubResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarClubesbyFilters(idclub: number, nombre: string, ciudad: string): Observable<ClubResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        idclub: idclub,
        nombre: nombre || "",
        ciudad: ciudad || ""
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<ClubResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
  }
  
}
