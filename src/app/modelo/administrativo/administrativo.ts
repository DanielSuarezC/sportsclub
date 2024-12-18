export class Administrativo {
    adm_cedula: number;
    nombre: string;
    email: string;
    telefono: string;
    cargo: string;
    sueldo: number;
    idclub: number;
    estado: string;
}

export interface AdministrativoResponse{
    value: Administrativo[];
}
