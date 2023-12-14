import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 

const validarJTW = ( req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    console.log(token);

    next();
}

export = {
    validarJTW
}