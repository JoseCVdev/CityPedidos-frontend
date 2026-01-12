import type { Usuario } from "@/interfaces/usuario.interface";

export interface AuthResponse {
    ok:     boolean;
    status: number;
    data:   Data;
    error:  null;
}

export interface Data {
    token:     string;
    expiresIn: number;
    menus:     Menu[];
    usuario:   Usuario;
}

export interface Menu {
    idMenu: number;
    nombre: string;
    icono:  string;
    url:    string;
}
