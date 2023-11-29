
import { Request, Response } from "express";
import loginService from '../../servicio/usuarios/login.service';


const login = async (req: Request, res: Response) => {
    try {
        const correo = req.body.correo;
        const password = req.body.password;

        const responde: any  = await loginService.login(correo, password);

        return res.status(200).json(responde.data)
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const correo = req.body.email;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const cedula = req.body.cedula;
        const telefono = req.body.telefono;
        const rol = req.body.rol;

        const responde: any  = await loginService.registerUser(correo, password, nombre, cedula, telefono, rol);

        return res.status(200).json(responde.data)
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}



  
export default {
  login,
  registerUser,
}