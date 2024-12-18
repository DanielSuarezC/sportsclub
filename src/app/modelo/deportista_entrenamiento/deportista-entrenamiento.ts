import { Time } from "@angular/common";

export class DeportistaEntrenamiento {
    identrenamiento: number;
    dep_cedula: number;                                      
    fecha: Date;
    horainicio: Time;
    horafin: Time;
}

export interface DeportistaEntrenamientoResponse{
    value: any[];
}
