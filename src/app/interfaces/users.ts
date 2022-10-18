export interface Users {
    usuarios: Usuario[];
}

export interface Usuario {
    nombre: string;
    usr: string;
    password: number;
    email: string;
    tipo: string;
}