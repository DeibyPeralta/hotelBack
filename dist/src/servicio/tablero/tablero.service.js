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
const mssql_1 = __importDefault(require("mssql"));
const vista = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .query(`SELECT h.num_habitacion, t.interno, t.hora_llegada, t.aseo, t.llamada, t.destino
                        FROM habitaciones h LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion;`);
        return {
            isError: false,
            data: queryResult.recordset
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .query(`SELECT MAX(num_habitacion) AS max_num_habitacion FROM habitaciones;`);
        return {
            isError: false,
            data: queryResult.recordset
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .input('interno', mssql_1.default.VarChar, interno)
            .input('num_habitacion', mssql_1.default.VarChar, num_habitacion)
            .input('hora_llegada', mssql_1.default.VarChar, hora_llegada)
            .input('aseo', mssql_1.default.VarChar, aseo)
            .input('llamada', mssql_1.default.VarChar, llamada)
            .input('destino', mssql_1.default.VarChar, destino)
            .query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino)
                    VALUES (@interno, @num_habitacion, @hora_llegada, @aseo, @llamada, @destino);`);
        return {
            isError: false,
            data: queryResult.recordset
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .query(`select estado, num_habitacion, comentario from habitaciones;`);
        return {
            isError: false,
            data: queryResult.recordset
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .input('estado', mssql_1.default.VarChar, body.estado)
            .input('comentario', mssql_1.default.VarChar, body.comentario)
            .input('num_habitacion', mssql_1.default.Int, body.num_habitacion)
            .query(`UPDATE habitaciones SET estado = @estado, comentario = @comentario
                 WHERE num_habitacion = @num_habitacion; `);
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .input('estado', mssql_1.default.VarChar, body.estado)
            .input('num_habitacion', mssql_1.default.Int, body.num_habitacion)
            .input('comentario', mssql_1.default.VarChar, body.comentario)
            .query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
                    VALUES (@estado, @num_habitacion, @comentario);`);
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .input('interno', mssql_1.default.VarChar, body.interno)
            .input('num_habitacion', mssql_1.default.Int, body.num_habitacion)
            .input('hora_llegada', mssql_1.default.VarChar, body.hora_llegada)
            .input('aseo', mssql_1.default.VarChar, body.aseo)
            .input('llamada', mssql_1.default.VarChar, body.llamada)
            .input('destino', mssql_1.default.VarChar, body.destino)
            .input('valor', mssql_1.default.Int, body.valor)
            .input('comentario', mssql_1.default.VarChar, body.comentario)
            .input('hora_salida', mssql_1.default.VarChar, body.hora_salida)
            .input('fecha', mssql_1.default.VarChar, body.fechaSalida)
            .query(`INSERT INTO historial( interno, num_habitacion,  hora_llegada, aseo, llamada, destino, valor, comentario, hora_salida, fecha )
                    VALUES (@interno, @num_habitacion, @hora_llegada, @aseo, @llamada, @destino, @valor, @comentario, @hora_salida, @fecha );`);
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .query(`select * from historial;`);
        return {
            isError: false,
            data: queryResult.recordset
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
        const pool = yield mssql_1.default.connect(dbConfig_1.default);
        const queryResult = yield pool.request()
            .input('num_habitacion', mssql_1.default.Int, num_habitacion)
            .query(`delete from tablero where num_habitacion = @num_habitacion;`);
        return {
            isError: false,
            data: queryResult.recordset
        };
    }
    catch (error) {
        console.log("ERROR al eliminar huesped de la habitacion.");
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
    deleteHabitaciones
};
