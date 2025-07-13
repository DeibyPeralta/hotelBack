import express from "express";
const router = express.Router();
import tableroController from '../../controlador/tablero/tablero.controller';

router.get('/vista-tablero', tableroController.vista);
router.get('/max-habitaciones', tableroController.maxhabitaciones);
router.post('/add-tablero', tableroController.addTablero);
router.get('/habitaciones', tableroController.habitaciones);
router.get('/habitaciones-disponibles', tableroController.habitacionesDisponibles);
router.post('/editar-habitaciones', tableroController.editarHabitaciones);
router.post('/add-habitaciones', tableroController.addHabitaciones);
router.delete('/eliminar-habitaciones/:num_habitacion', tableroController.deleteHabitaciones);
router.post('/historial-habitaciones', tableroController.historialHabitaciones);
router.get('/historial', tableroController.historial);
router.put('/update-historial', tableroController.updateHistorial);
router.post('/editar_tablero', tableroController.editar_tablero);
router.post('/cuadre-caja', tableroController.cuadre_caja);
router.get('/flujo-efectivo', tableroController.flujoEfectivo);
router.get('/total-efectivo', tableroController.totalEfectivo);
router.post('/efectivo', tableroController.efectivo);
router.post('/update-base', tableroController.updateBase);
router.get('/historial-caja', tableroController.historialcajaBase);
router.get('/historial-graficos', tableroController.historialGraficos);
router.post('/insert-gastos-diarios', tableroController.insertGastosDiarios);
router.get('/get-all-gastos-diarios', tableroController.getGastosDiarios);
router.get('/total-gastos-diarios', tableroController.totalGastosDiarios);
router.get('/interno-placa/:interno', tableroController.internoPlaca);

export default router;