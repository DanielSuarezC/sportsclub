import { Time } from "@angular/common";

export class ReunionAdministrativo {
    idreunion: number;
    adm_cedula: number;
    horainicio: Time;
    horafin: Time;
}

export interface ReunionAdministrativoResponse{
    value: ReunionAdministrativo[];
}
