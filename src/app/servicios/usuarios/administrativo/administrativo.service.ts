import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministrativoResponse } from 'src/app/modelo/administrativo/administrativo';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  baseUrl = environment.urlServices + 'administrativo/';

  constructor(private httpClient: HttpClient) { }

  public guardar(Administrativo: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'addAdministrativo.php', Administrativo);
  }

  public consultarAdministrativos(): Observable<AdministrativoResponse> {
    return this.httpClient.get<AdministrativoResponse>(this.baseUrl + 'getAll.php');
  }

  public consultarAdministrativosbyFilters(adm_cedula: number, nombre: string, cargo: string, estado: string, idclub: number): Observable<AdministrativoResponse> {
    // Crear un objeto con los datos a enviar
    const payload = {
        adm_cedula: adm_cedula || 0,
        nombre: nombre || "",
        cargo: cargo || "",
        estado: estado || "",
        idclub: idclub || 0
    };

    // Realizar una solicitud POST con el JSON al backend
    return this.httpClient.post<AdministrativoResponse>(
        this.baseUrl + 'getbyFilters.php', // URL de la API
        JSON.stringify(payload)           // Convertir el objeto a JSON                   
    );
 }
}
