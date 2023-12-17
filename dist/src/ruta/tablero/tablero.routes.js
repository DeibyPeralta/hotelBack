"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tablero_controller_1 = __importDefault(require("../../controlador/tablero/tablero.controller"));
router.get('/vista-tablero', tablero_controller_1.default.vista);
router.get('/max-habitaciones', tablero_controller_1.default.maxhabitaciones);
router.post('/add-tablero', tablero_controller_1.default.addTablero);
router.get('/habitaciones', tablero_controller_1.default.habitaciones);
router.post('/editar-habitaciones', tablero_controller_1.default.editarHabitaciones);
router.post('/add-habitaciones', tablero_controller_1.default.addHabitaciones);
router.delete('/eliminar-habitaciones/:num_habitacion', tablero_controller_1.default.deleteHabitaciones);
router.post('/historial-habitaciones', tablero_controller_1.default.historialHabitaciones);
router.get('/historial', tablero_controller_1.default.historial);
router.post('/editar_tablero', tablero_controller_1.default.editar_tablero);
exports.default = router;
