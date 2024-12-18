export class Torneo {
    idtorneo: number;
    nombre: string;
    modalidad: string;
    fecha: Date;
    estado: string;
    idclub: number;
}

export interface TorneoResponse{
    value: Torneo[];
}
