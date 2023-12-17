import dbConfig  from "../../config/dbConfig";
const pool = dbConfig.pool;

const vista = async () => {
    try {
        console.log('***** Añadiendo datos del tablero *****');
    
        const queryResult = await pool.query(`SELECT h.num_habitacion, t.interno, t.hora_llegada, t.aseo, t.llamada, t.destino
                        FROM habitaciones h LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const maxhabitaciones = async () => {
    try {
        
        const queryResult = await pool.query(`SELECT MAX(num_habitacion) AS max_num_habitacion FROM habitaciones;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const addTablero = async (interno: string, num_habitacion: string, hora_llegada: string, aseo: string, llamada: string, destino: string) => {
    try {
        console.log('***** Añadiendo datos del tablero *****');

        const queryResult = await pool.query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino)
                    VALUES ( '${interno}', ${num_habitacion}, '${hora_llegada}', '${aseo}', '${llamada}', '${destino}'); `)

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar en el tablero.");
        console.log(error);
        throw error;
    }
}

const habitaciones = async () => {
    try {
        const queryResult = await pool.query(`select estado, num_habitacion, comentario from habitaciones;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const editar_Habitaciones = async ( body: any ) => {
    try { 
     
        const queryResult = await pool.query(`UPDATE habitaciones SET estado = '${body.estado}', comentario = '${body.comentario}'
                 WHERE num_habitacion = ${body.num_habitacion}; `);

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
        console.log('***** Añadiendo datos del tablero *****');

        const queryResult = await pool.query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
                    VALUES ('${body.estado}', ${body.num_habitacion}, '${body.comentario}');`);
                 
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
        
          const queryResult = await pool.query(`INSERT INTO historial( interno, num_habitacion,  hora_llegada, aseo, llamada, destino, valor, comentario, hora_salida, fecha )
                    VALUES ('${body.interno}', ${body.num_habitacion}, '${body.hora_llegada}', '${body.aseo}', '${body.llamada}', '${body.destino}', '${body.valor}', '${body.comentario}', '${body.hora_salida}', '${body.fecha}' );`);
                 
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
       
        const queryResult = await pool.query(`select * from historial;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
}

const deleteHabitaciones = async ( num_habitacion: any ) => {
    try {
        // const pool = await sql.connect(dbConfig);
        
        const queryResult = await pool.query(`delete from tablero where num_habitacion = ${num_habitacion};`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al eliminar huesped de la habitacion.");
        console.log(error);
        throw error;
    }
}

const editar_tablero = async ( body: any ) => {
    try { 
     console.log(body);
        const queryResult = await pool.query(`UPDATE tablero SET  hora_llegada = '${body.hora_llegada}', aseo = '${body.aseo}',
            llamada = '${body.llamada}', destino = '${body.destino}'
            WHERE  num_habitacion = ${body.num_habitacion} OR interno = '${body.interno}'; `);

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


export default {
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
}