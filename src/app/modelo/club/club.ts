export class Club {
    idclub: number;
    nombre: string;
    ciudad: string; 
    direccion: string;
    telefono: string;
}

export interface ClubResponse{
    value: Club[];
}
    