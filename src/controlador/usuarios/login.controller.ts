
import { Request, Response, response } from "express";
import loginService from '../../servicio/usuarios/login.service';


const login = async (req: Request, res: Response) => {
    try {
        const correo = req.body.correo;
        const password = req.body.password;

        const response: any  = await loginService.login(correo, password);
        
            if(response.isError == true){
                return res.status(200).json(response)
            }
        return res.status(200).json(response)
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const registerUser = async (req: Request, res: Response) => {
    try { 
        const correo = req.body.correo;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const cedula = req.body.cedula;
        const telefono = req.body.telefono;
        const rol = '1';//req.body.rol;
        
        const responde: any  = await loginService.registerUser(correo, password, nombre, cedula, telefono, rol);

        return res.status(200).json(responde.message)
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