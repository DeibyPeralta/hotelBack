
import { Request, Response, response } from "express";
import loginService from '../../servicio/usuarios/login.service';
import { Usuario } from "../../utils/huella";

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

const verificarHuella = async (req: Request, res: Response) => {
    try { 

        const schema = (req as any).schema
        const { huella_base64 } = req.body

        if (!huella_base64)
        return res.status(400).json({ error: "Huella base64 es requerida" })

        const persona = await loginService.verificarHuella(huella_base64, schema)

        if (persona) {
            res.status(200).json({ encontrado: true, datos: persona })
        } else {
            res.status(404).json({ encontrado: false, mensaje: "Huella no encontrada" })
        }     
    } catch (error) {
        throw error;
    }
}

const captureHuella = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema
  
        const usuario: Usuario = {
            nombre: req.body.nombre, 
            apellido: req.body.apellido, 
            cedula: req.body.cedula, 
            telefono: req.body.telefono, 
            huella_base64: req.body.huella, 
        }
        
        await loginService.captureHuella(usuario, schema)

        return res.status(201).json({mensaje: "Usuario registrado con éxito" })
    } catch (error) {
        throw error;
    }
}



  
export default {
  login,
  registerUser,
  permisos,
  editPermisos,
  deleteUsers,
  verificarHuella,
  captureHuella
}