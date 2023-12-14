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
        const response = yield tablero_service_1.default.vista();
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const maxhabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield tablero_service_1.default.maxhabitaciones();
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
        console.log(req.body);
        const interno = req.body.interno;
        const num_habitacion = req.body.num_habitacion;
        const hora_llegada = req.body.hora_llegada;
        const aseo = req.body.aseo;
        const llamada = req.body.llamada;
        const destino = req.body.destino;
        const response = yield tablero_service_1.default.addTablero(interno, num_habitacion, hora_llegada, aseo, llamada, destino);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const habitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield tablero_service_1.default.habitaciones();
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
        const body = req.body;
        const response = yield tablero_service_1.default.editar_Habitaciones(body);
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
        const body = req.body;
        const response = yield tablero_service_1.default.addHabitaciones(body);
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
        const body = req.body;
        const response = yield tablero_service_1.default.historialHabitaciones(body);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const historial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield tablero_service_1.default.historial();
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const deleteHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numHabitacion = req.params.num_habitacion;
        const response = yield tablero_service_1.default.deleteHabitaciones(numHabitacion);
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
    deleteHabitaciones,
};
