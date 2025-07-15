"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablero_service_1 = __importDefault(require("../../servicio/tablero/tablero.service"));
const vista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.vista(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        throw error;
    }
});
const maxhabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.maxhabitaciones(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const addTablero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const interno = req.body.interno;
        const num_habitacion = req.body.num_habitacion;
        const hora_llegada = req.body.hora_llegada;
        const aseo = req.body.aseo;
        const llamada = req.body.llamada;
        const destino = req.body.destino;
        const fechaActual = new Date();
        const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        const response = yield tablero_service_1.default.addTablero(interno, num_habitacion, hora_llegada, aseo, llamada, destino, fechaFormateada, schema);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const habitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.habitaciones(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const editarHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const body = req.body;
        const response = yield tablero_service_1.default.editar_Habitaciones(body, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const addHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const body = req.body;
        const response = yield tablero_service_1.default.addHabitaciones(body, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const historialHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const { socio } = req.body;
        const validateSocio = yield tablero_service_1.default.validateSocio(socio, schema);
        if (validateSocio.isError || !validateSocio.data) {
            return res.status(404).json({
                isError: true,
                message: "Socio no encontrado o inválido"
            });
        }
        const response = yield tablero_service_1.default.historialHabitaciones(req.body, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
const historial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.historial(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const updateHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        yield tablero_service_1.default.updateHistorial(req.body, schema);
        res.status(200).json({ message: 'Historial actualizado correctamente' });
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const deleteHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const numHabitacion = req.params.num_habitacion;
        const response = yield tablero_service_1.default.deleteHabitaciones(numHabitacion, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const editar_tablero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const body = req.body;
        const response = yield tablero_service_1.default.editar_tablero(body, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const cuadre_caja = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const body = req.body;
        yield tablero_service_1.default.cuadre_caja(body, schema);
        return res.status(200);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const flujoEfectivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.flujoEfectivo(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const totalEfectivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.totalEfectivo(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const efectivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.efectivo(req.body, schema);
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const updateBase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.updateBase(req.body, schema);
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const historialcajaBase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.historialcajaBase(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        throw error;
    }
});
const historialGraficos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const { socio, destino, fechasistema } = req.query;
        const filtros = {};
        if (socio)
            filtros.socio = socio;
        if (destino)
            filtros.destino = destino;
        if (fechasistema)
            filtros.fechasistema = fechasistema;
        const response = yield tablero_service_1.default.historialGraficos(filtros, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const habitacionesDisponibles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.habitacionesDisponibles(schema);
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const insertGastosDiarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.insertGastosDiarios(req.body, schema);
        return res.status(200).json('Gastos insertados correctamente');
    }
    catch (error) {
        throw error;
    }
});
const getGastosDiarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.getGastosDiarios(schema);
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const totalGastosDiarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield tablero_service_1.default.totalGastosDiarios(schema);
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const internoPlaca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const interno = req.params.interno;
        const response = yield tablero_service_1.default.internoPlaca(interno, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
exports.default = {
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
};
