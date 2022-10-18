export interface Users {
    alumno: Alumno[];
    profesor: Alumno[];
}

export interface Alumno {
    nombre: string;
    password: number;
    email: string;
}