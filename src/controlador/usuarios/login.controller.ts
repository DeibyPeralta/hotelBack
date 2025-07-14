
import { Request, Response, response } from "express";
import loginService from '../../servicio/usuarios/login.service';


const login = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema
        const correo = req.body.correo;
        const password = req.body.password;

        const response: any  = await loginService.login(correo, password, schema);
      
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
        const schema = (req as any).schema
        const correo = req.body.correo;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const cedula = req.body.cedula;
        const telefono = req.body.telefono;       
        
        const responde: any  = await loginService.registerUser(correo, password, nombre, cedula, telefono, schema);
        
        return res.status(200).json(responde.message)
    } catch (error) {
        throw error;
    }
}

const permisos = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema
        const responde: any  = await loginService.permisos(schema);

        return res.status(200).json(responde)
    } catch (error) {
        throw error;
    }
}

const editPermisos = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema
        const correo = req.body.correo;
        const rol = req.body.rol;
        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const id = req.body.id;
        const password = req.body.password;

        const responde: any  = await loginService.editPermisos(correo, nombre, telefono, rol, id, password, schema);

        return res.status(200).json(responde)
    } catch (error) {
        throw error;
    }
}

const deleteUsers = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema
        const { id } = req.params;
 
        const responde: any  = await loginService.deleteUsers(id, schema);

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