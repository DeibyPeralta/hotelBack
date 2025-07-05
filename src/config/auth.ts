import { rejects } from 'assert';
import { error } from 'console';
import jwt from 'jsonwebtoken';
require('dotenv').config()

const secretKey = process.env.SECRETKEY; 

if (!secretKey) {
  throw new Error('SECRETKEY no está definido en las variables de entorno');
}

export function generarToken(payload: any) {
  return jwt.sign(payload, secretKey as string, { expiresIn: '1h' }); // El token expira en 1 hora
}

export function verificarToken(token: string): any {
  try {
    const decoded = jwt.verify(token, secretKey as string);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
