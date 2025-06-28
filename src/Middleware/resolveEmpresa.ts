import { Request, Response, NextFunction } from "express";
import dbConfig from "../config/dbConfig";
const pool = dbConfig.pool;

export async function resolveEmpresa(req: Request, res: Response, next: NextFunction) {
  const subdominio = req.headers.host?.split('.')[0];
  if (!subdominio) return res.status(400).send('Subdominio no encontrado');

  const result = await pool.query(
    'SELECT id, esquema FROM empresas WHERE esquema = $1',
    [subdominio]
  );

  if (result.rowCount === 0) {
    return res.status(404).send('Empresa no encontrada');
  }

  (req as any).empresa = {
    id: result.rows[0].id,
    esquema: result.rows[0].esquema
  };

  next();
}