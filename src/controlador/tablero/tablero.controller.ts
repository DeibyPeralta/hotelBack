import { Request, Response } from "express";
import tableroService from '../../servicio/tablero/tablero.service';

const 
vista = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
 
        const response: any = await tableroService.vista(schema);

        return res.status(200).json(response.data);
    } catch (error) {
        throw error;
    }
}

const maxhabitaciones = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        const response: any = await tableroService.maxhabitaciones(schema);

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const addTablero = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const interno = req.body.interno
        const num_habitacion = req.body.num_habitacion
        const hora_llegada = req.body.hora_llegada
        const aseo = req.body.aseo
        const llamada = req.body.llamada
        const destino = req.body.destino

        const fechaActual = new Date();
        const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

        const response: any = await tableroService.addTablero(interno, num_habitacion, hora_llegada, aseo, llamada, destino, fechaFormateada, schema);
 
        return res.status(200).json(response);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const habitaciones = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        const response: any = await tableroService.habitaciones(schema);

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const editarHabitaciones = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const body = req.body;
       
        const response: any = await tableroService.editar_Habitaciones( body, schema );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const addHabitaciones = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const body = req.body; 

        const response: any = await tableroService.addHabitaciones( body, schema );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const historialHabitaciones = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        const { socio } = req.body; 

        const validateSocio = await tableroService.validateSocio(socio, schema);

        if (validateSocio.isError || !validateSocio.data) {
            return res.status(404).json({  
                isError: true,
                message: "Socio no encontrado o inválido"
            });
        }

        const response: any = await tableroService.historialHabitaciones(req.body, schema);

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const historial = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        const response: any = await tableroService.historial(schema);
      
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const updateHistorial = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        await tableroService.updateHistorial(req.body, schema);
      
        res.status(200).json({ message: 'Historial actualizado correctamente' });
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}
  
const deleteHabitaciones = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const numHabitacion = req.params.num_habitacion;

        const response: any = await tableroService.deleteHabitaciones( numHabitacion, schema );
        
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const editar_tablero = async (req: Request, res: Response) => {
    try { 

        const schema = (req as any).schema;
        const body = req.body;
       
        const response: any = await tableroService.editar_tablero( body, schema );

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const cuadre_caja = async (req: Request, res: Response) => {
    try { 

        const schema = (req as any).schema;
        const body = req.body;
        
        await tableroService.cuadre_caja( body, schema );
        
        return res.status(200);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const flujoEfectivo = async (req: Request, res: Response) => {
    try { 
        
        const schema = (req as any).schema;
        const response: any = await tableroService.flujoEfectivo(schema);
   
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const totalEfectivo = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.totalEfectivo(schema);
   
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const efectivo = async (req: Request, res: Response) => {
    try { 
        
        const schema = (req as any).schema;
        const response: any = await tableroService.efectivo(req.body, schema);
        
        return res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

const updateBase = async (req: Request, res: Response) => {
    try { 

        const schema = (req as any).schema;
        const response: any = await tableroService.updateBase(req.body, schema);
   
        return res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

const historialcajaBase = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.historialcajaBase(schema);

        return res.status(200).json(response.data);
    } catch (error) {
        throw error;
    }
}

const historialGraficos = async (req: Request, res: Response) => {
    try {
        const schema = (req as any).schema;
        const { socio, destino, fechasistema } = req.query;
        const filtros: any = {};
        if (socio) filtros.socio = socio;
        if (destino) filtros.destino = destino;
        if (fechasistema) filtros.fechasistema = fechasistema;
        const response: any = await tableroService.historialGraficos(filtros, schema);
      
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const habitacionesDisponibles = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.habitacionesDisponibles(schema);
        
        return res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

const insertGastosDiarios = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.insertGastosDiarios(req.body, schema);
       
        return res.status(200).json('Gastos insertados correctamente');
    } catch (error) {
        throw error;
    }
}

const getGastosDiarios = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.getGastosDiarios(schema);
            
        return res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

const totalGastosDiarios = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const response: any = await tableroService.totalGastosDiarios(schema);
       
        return res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

const internoPlaca = async (req: Request, res: Response) => {
    try { 
        const schema = (req as any).schema;
        const interno = req.params.interno;
        const response = await tableroService.internoPlaca( interno, schema );
      
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
    updateHistorial, 
    deleteHabitaciones, 
    editar_tablero, 
    cuadre_caja,
    flujoEfectivo,
    totalEfectivo,
    efectivo,
    updateBase,
    historialcajaBase,
    historialGraficos,
    habitacionesDisponibles,
    insertGastosDiarios,
    getGastosDiarios,
    totalGastosDiarios,
    internoPlaca
}