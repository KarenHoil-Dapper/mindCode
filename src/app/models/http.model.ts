export interface DefaultResponse {
  code?: number,
  status: number,
  data: any,
  message: string
}
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
  };
}

