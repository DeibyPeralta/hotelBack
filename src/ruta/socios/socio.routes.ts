import express from "express";
const router = express.Router();
import sociosController from '../../controlador/socios/socios.controller';

router.post('/updatesocios', sociosController.updateSocios);
router.post('/update-socios', sociosController.updateSocio);
router.get('/getsocios', sociosController.getsocios);


export default router;