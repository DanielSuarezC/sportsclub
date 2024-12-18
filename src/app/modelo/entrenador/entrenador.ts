export class Entrenador {
    ent_cedula: number;
    nombre: string;
    email: string;
    telefono:string;
    elo: number;
    tituloFide:string;
    sueldo: number;
    idclub: number;
    estado:string;
}

export interface EntrenadorResponse{
    value: Entrenador[];
}
