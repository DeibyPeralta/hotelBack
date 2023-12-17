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
const dbConfig_1 = __importDefault(require("../../config/dbConfig"));
const pool = dbConfig_1.default.pool;
const vista = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('***** Añadiendo datos del tablero *****');
        const queryResult = yield pool.query(`SELECT h.num_habitacion, t.interno, t.hora_llegada, t.aseo, t.llamada, t.destino
                        FROM habitaciones h LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion;`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const maxhabitaciones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield pool.query(`SELECT MAX(num_habitacion) AS max_num_habitacion FROM habitaciones;`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const addTablero = (interno, num_habitacion, hora_llegada, aseo, llamada, destino) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('***** Añadiendo datos del tablero *****');
        const queryResult = yield pool.query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino)
                    VALUES ( '${interno}', ${num_habitacion}, '${hora_llegada}', '${aseo}', '${llamada}', '${destino}'); `);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al registrar en el tablero.");
        console.log(error);
        throw error;
    }
});
const habitaciones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield pool.query(`select estado, num_habitacion, comentario from habitaciones;`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const editar_Habitaciones = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield pool.query(`UPDATE habitaciones SET estado = '${body.estado}', comentario = '${body.comentario}'
                 WHERE num_habitacion = ${body.num_habitacion}; `);
        return {
            isError: false,
            data: 'ok'
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const addHabitaciones = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('***** Añadiendo datos del tablero *****');
        const queryResult = yield pool.query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
                    VALUES ('${body.estado}', ${body.num_habitacion}, '${body.comentario}');`);
        return {
            isError: false,
            data: 'ok'
        };
    }
    catch (error) {
        console.log("ERROR al registrar una habitacion.");
        console.log(error);
        throw error;
    }
});
const historialHabitaciones = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield pool.query(`INSERT INTO historial( interno, num_habitacion,  hora_llegada, aseo, llamada, destino, valor, comentario, hora_salida, fecha )
                    VALUES ('${body.interno}', ${body.num_habitacion}, '${body.hora_llegada}', '${body.aseo}', '${body.llamada}', '${body.destino}', '${body.valor}', '${body.comentario}', '${body.hora_salida}', '${body.fecha}' );`);
        return {
            isError: false,
            data: 'Registro exitoso'
        };
    }
    catch (error) {
        console.log("ERROR al registrar una habitacion.");
        console.log(error);
        throw error;
    }
});
const historial = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield pool.query(`select * from historial;`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const deleteHabitaciones = (num_habitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const pool = await sql.connect(dbConfig);
        const queryResult = yield pool.query(`delete from tablero where num_habitacion = ${num_habitacion};`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log("ERROR al eliminar huesped de la habitacion.");
        console.log(error);
        throw error;
    }
});
const editar_tablero = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(body);
        const queryResult = yield pool.query(`UPDATE tablero SET  hora_llegada = '${body.hora_llegada}', aseo = '${body.aseo}',
            llamada = '${body.llamada}', destino = '${body.destino}'
            WHERE  num_habitacion = ${body.num_habitacion} OR interno = '${body.interno}'; `);
        return {
            isError: false,
            data: 'ok'
        };
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
exports.default = {
    vista,
    maxhabitaciones,
    addTablero,
    habitaciones,
    editar_Habitaciones,
    addHabitaciones,
    historialHabitaciones,
    historial,
    deleteHabitaciones,
    editar_tablero
};
