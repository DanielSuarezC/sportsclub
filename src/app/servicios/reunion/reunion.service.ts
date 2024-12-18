import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReunionResponse } from 'src/app/modelo/reunion/reunion';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  baseUrl = environment.urlServices + 'reunion/';

  constructor(private httpClient: HttpClient) { }

  public guardar(reunion: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'add.php', reunion);
  }

  public consultarReuniones(): Observable<ReunionResponse> {
    return this.httpClient.get<ReunionResponse>(this.baseUrl + 'getAll.php');
  }
}
