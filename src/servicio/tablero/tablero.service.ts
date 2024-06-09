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

const addTablero = async (interno: string, num_habitacion: string, hora_llegada: string, aseo: string, llamada: string, destino: string, fecha_llegada: any) => {
    try {
        console.log('***** Añadiendo datos del tablero *****');

        const queryResult = await pool.query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino, fechaLlegada)
                    VALUES ( '${interno}', ${num_habitacion}, '${hora_llegada}', '${aseo}', '${llamada}', '${destino}', '${fecha_llegada}'); `)

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

        console.log(body)
        body.fecha = getCurrentDateTime();
        console.log(body)
        const queryResult = await pool.query(`INSERT INTO historial( num_habitacion, hora_llegada, llamada, interno, placa, aseo, valor_hospedaje, valor_lavado, valor_parqueo, num_factura, valor_factura, comentario, socio, fechaSalida, destino, hora_salida, fecha )
                    VALUES ('${body.num_habitacion}', '${body.hora_llegada}', '${body.llamada}', '${body.interno}', '${body.placa}', '${body.aseo}', '${body.valor_hospedaje}', '${body.valor_lavado}', '${body.valor_parqueo}', '${body.num_factura}', '${body.valor_factura}', '${body.comentario}', '${body.socio}', '${body.fechaSalida}', '${body.destino}', '${body.hora_salida}', '${body.fecha}' );`);
                 
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

function getCurrentDateTime(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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