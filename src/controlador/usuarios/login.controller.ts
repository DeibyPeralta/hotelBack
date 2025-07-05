
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
        
        const responde: any  = await loginService.registerUser(correo, password, nombre, cedula, telefono);

        return res.status(200).json(responde.message)
    } catch (error) {
        throw error;
    }
}

const permisos = async (req: Request, res: Response) => {
    try { 
             
        const responde: any  = await loginService.permisos();

        return res.status(200).json(responde)
    } catch (error) {
        throw error;
    }
}

const editPermisos = async (req: Request, res: Response) => {
    try { 
             
        const correo = req.body.correo;
        const rol = req.body.rol;
        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const id = req.body.id;

        const responde: any  = await loginService.editPermisos(correo, nombre, telefono, rol, id);

        return res.status(200).json(responde)
    } catch (error) {
        throw error;
    }
}

const deleteUsers = async (req: Request, res: Response) => {
    try { 
             
        const { id } = req.params;
 
        const responde: any  = await loginService.deleteUsers(id);

        return res.status(200).json(responde)
    } catch (error) {
        throw error;
    }
}



  
export default {
  login,
  registerUser,
  permisos,
  editPermisos,
  deleteUsers
}