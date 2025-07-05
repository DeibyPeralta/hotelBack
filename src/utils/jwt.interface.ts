export interface JwtPayload {
  id: number;
  username: string;
  rol: string;
  iat?: number;
  exp?: number;
}