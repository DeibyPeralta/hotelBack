import dbConfig from "../../config/dbConfig";
import sql from "mssql";

const vista = async () => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .query(`SELECT h.num_habitacion, t.interno, t.hora_llegada, t.aseo, t.llamada, t.destino
                        FROM habitaciones h LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion;`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const maxhabitaciones = async () => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .query(`SELECT MAX(num_habitacion) AS max_num_habitacion FROM habitaciones;`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const addTablero = async (interno: string, num_habitacion: string, hora_llegada: string, aseo: string, llamada: string, destino: string) => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .input('interno', sql.VarChar, interno)
            .input('num_habitacion', sql.VarChar, num_habitacion)
            .input('hora_llegada', sql.VarChar, hora_llegada)
            .input('aseo', sql.VarChar, aseo)
            .input('llamada', sql.VarChar, llamada)
            .input('destino', sql.VarChar, destino)
            .query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino)
                    VALUES (@interno, @num_habitacion, @hora_llegada, @aseo, @llamada, @destino);`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al registrar en el tablero.");
        console.log(error);
        throw error;
    }
}

const habitaciones = async () => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .query(`select estado, num_habitacion, comentario from habitaciones;`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const editar_Habitaciones = async ( body: any ) => {
    try { 
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
                .input('estado', sql.VarChar, body.estado)
                .input('comentario', sql.VarChar, body.comentario)
                .input('num_habitacion', sql.Int, body.num_habitacion)
                .query(`UPDATE habitaciones SET estado = @estado, comentario = @comentario
                 WHERE num_habitacion = @num_habitacion; `);

        return {
            isError: false,
            data: 'ok'
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const addHabitaciones = async ( body: any ) => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .input('estado', sql.VarChar, body.estado)
            .input('num_habitacion', sql.Int, body.num_habitacion)
            .input('comentario', sql.VarChar, body.comentario)
            .query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
                    VALUES (@estado, @num_habitacion, @comentario);`);
                 
        return {
            isError: false,
            data: 'ok'
        };
    } catch (error) {
        console.log("ERROR al registrar una habitacion.");
        console.log(error);
        throw error;
    }
}

const historialHabitaciones = async ( body: any ) => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .input('interno', sql.VarChar, body.interno)
            .input('num_habitacion', sql.Int, body.num_habitacion)
            .input('hora_llegada', sql.VarChar, body.hora_llegada)
            .input('aseo', sql.VarChar, body.aseo)
            .input('llamada', sql.VarChar, body.llamada)
            .input('destino', sql.VarChar, body.destino)
            .input('valor', sql.Int, body.valor)
            .input('comentario', sql.VarChar, body.comentario)
            .input('hora_salida', sql.VarChar, body.hora_salida)
            .input('fecha', sql.VarChar, body.fechaSalida)
            .query(`INSERT INTO historial( interno, num_habitacion,  hora_llegada, aseo, llamada, destino, valor, comentario, hora_salida, fecha )
                    VALUES (@interno, @num_habitacion, @hora_llegada, @aseo, @llamada, @destino, @valor, @comentario, @hora_salida, @fecha );`);
                 
        return {
            isError: false,
            data: 'Registro exitoso'
        };
    } catch (error) {
        console.log("ERROR al registrar una habitacion.");
        console.log(error);
        throw error;
    }
}

const historial = async ( ) => {
    try {
        const pool = await sql.connect(dbConfig);

        const queryResult = await pool.request()
            .query(`select * from historial;`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const deleteHabitaciones = async ( num_habitacion: any ) => {
    try {
        const pool = await sql.connect(dbConfig);
        
        const queryResult = await pool.request()
            .input('num_habitacion', sql.Int, num_habitacion)
            .query(`delete from tablero where num_habitacion = @num_habitacion;`);

        return {
            isError: false,
            data: queryResult.recordset
        };
    } catch (error) {
        console.log("ERROR al eliminar huesped de la habitacion.");
        console.log(error);
        throw error;
    }
}

export default {
    vista,
    maxhabitaciones,
    addTablero,
    habitaciones,
    editar_Habitaciones,
    addHabitaciones,
    historialHabitaciones,
    historial,
    deleteHabitaciones
}