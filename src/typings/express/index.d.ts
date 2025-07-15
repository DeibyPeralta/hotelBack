import { JwtPayload } from '../../utils/jwt.interface'; // Ajusta el path si tu JWT tiene una interfaz

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      schema?: string;
    }
  }
}
