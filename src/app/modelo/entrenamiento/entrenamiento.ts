export class Entrenamiento {

    identrenamiento: number;
    tipo: string;
    jornada: string;
    ent_cedula: number;
    estado: string;
}

export interface EntrenamientoResponse{
    value: Entrenamiento[];
}
