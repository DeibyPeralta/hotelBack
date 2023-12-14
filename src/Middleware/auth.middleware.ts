import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../config/auth';

// Extender la interfaz de tipo Request
interface RequestConUsuario extends Request {
  usuario?: any; 
}

export function autenticarMiddleware(req: RequestConUsuario, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    return;
  }

  try {
    const usuario = verificarToken(token);
    req.usuario = usuario; 
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
}
