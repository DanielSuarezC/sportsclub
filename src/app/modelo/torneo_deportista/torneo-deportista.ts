import { Time } from "@angular/common";

export class TorneoDeportista {

    idtorneo: number;
    dep_cedula: number;
    horainicio:Time;
    horafin:Time;
}

export interface TorneoDeportistaResponse{
    value: any[];
}
