import { Time } from "@angular/common";

export class Reunion {

    idreunion: number;
    nombre: string;
    fecha: Date;
    horainicio: Time;
    estado: string;
}

export interface ReunionResponse{
    value: Reunion[];
}
