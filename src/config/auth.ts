
import { rejects } from 'assert';
import { error } from 'console';
import jwt from 'jsonwebtoken';

const secretKey = 'tu_secreto_secreto'; 

export function generarToken(payload: any) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora
}

export function verificarToken(token: string): any {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
