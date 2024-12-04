import { Request, Response } from "express";
import tableroService from '../../servicio/tablero/tablero.service';

const vista = async (req: Request, res: Response) => {
    try {
        const response: any = await tableroService.vista();

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const maxhabitaciones = async (req: Request, res: Response) => {
    try {
        const response: any = await tableroService.maxhabitaciones();

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const addTablero = async (req: Request, res: Response) => {
    try { 
        const interno = req.body.interno
        const num_habitacion = req.body.num_habitacion
        const hora_llegada = req.body.hora_llegada
        const aseo = req.body.aseo
        const llamada = req.body.llamada
        const destino = req.body.destino

        const fechaActual = new Date();
        const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

        console.log(fechaFormateada);
        const response: any = await tableroService.addTablero(interno, num_habitacion, hora_llegada, aseo, llamada, destino, fechaFormateada);
        
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const habitaciones = async (req: Request, res: Response) => {
    try {
        const response: any = await tableroService.habitaciones();

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const editarHabitaciones = async (req: Request, res: Response) => {
    try { 

        const body = req.body;
       
        const response: any = await tableroService.editar_Habitaciones( body );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const addHabitaciones = async (req: Request, res: Response) => {
    try { 
        
        const body = req.body; 

        const response: any = await tableroService.addHabitaciones( body );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const historialHabitaciones = async (req: Request, res: Response) => {
    try { 
        console.log(req.body.socio)
        const validateSocio = await tableroService.validateSocio(req.body.socio)
   
        if (validateSocio.isError || !validateSocio.data) {
            return res.status(404).json({  
                isError: true,
                message: "Socio no encontrado o inválido" });
        }
    
        const response: any = await tableroService.historialHabitaciones(req.body);

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const historial = async (req: Request, res: Response) => {
    try {
        const response: any = await tableroService.historial();

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const deleteHabitaciones = async (req: Request, res: Response) => {
    try { 
        const numHabitacion = req.params.num_habitacion;
        const response: any = await tableroService.deleteHabitaciones( numHabitacion );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const editar_tablero = async (req: Request, res: Response) => {
    try { 

        const body = req.body;
       
        const response: any = await tableroService.editar_tablero( body );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

export default {
    vista,
    maxhabitaciones,
    addTablero,
    habitaciones,
    editarHabitaciones,
    addHabitaciones,
    historialHabitaciones,
    historial,
    deleteHabitaciones,
    editar_tablero
}