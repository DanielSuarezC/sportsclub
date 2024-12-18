export class Deportista {
    dep_cedula: number;
    nombre: string;
    email: string;
    telefono:string;
    categoria:string;
    elo: number;
    idclub: number;
    estado:string;
}

export interface DeportistaResponse{
    value: Deportista[];
}
