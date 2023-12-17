import express from "express";
const router = express.Router();
import tableroController from '../../controlador/tablero/tablero.controller';

router.get('/vista-tablero', tableroController.vista);
router.get('/max-habitaciones', tableroController.maxhabitaciones);
router.post('/add-tablero', tableroController.addTablero);
router.get('/habitaciones', tableroController.habitaciones);
router.post('/editar-habitaciones', tableroController.editarHabitaciones);
router.post('/add-habitaciones', tableroController.addHabitaciones);
router.delete('/eliminar-habitaciones/:num_habitacion', tableroController.deleteHabitaciones);
router.post('/historial-habitaciones', tableroController.historialHabitaciones);
router.get('/historial', tableroController.historial);
router.post('/editar_tablero', tableroController.editar_tablero);

export default router;