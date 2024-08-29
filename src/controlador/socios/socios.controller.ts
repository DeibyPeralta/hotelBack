import { Request, Response } from "express";
import sociosService from "../../servicio/socios/socios.service";
import xlsx from 'xlsx';
const updateSocios = async(req: Request, res: Response) => {
    try {
        const files = (req as any).files;
        
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: 'No se ha seleccionado ningún archivo para subir.' });
          }
      
        const file = files.file;

        const workbook = xlsx.read(file.data, { type: 'buffer' });

        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]]; 

        const data = xlsx.utils.sheet_to_json(sheet);
        
        const response: any = await sociosService.updateSocios(data);
          console.log(response)
        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const getsocios = async(req: Request, res: Response) => {
    try {
        
        const response: any = await sociosService.getsocios();

        return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

const updateSocio = async(req: Request, res: Response) => {
    try {
        console.log(req.body)
        // const response: any = await sociosService.updateSocio(req.body);

        // return res.status(200).json(response.data);
    } catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
}

export default {
    updateSocios,
    getsocios,
    updateSocio
}