import dbConfig  from "../../config/dbConfig";
const pool = dbConfig.pool;

const vista = async () => {
    try {
        console.log('***** Añadiendo datos del tablero *****');
    
        const queryResult = await pool.query(`SELECT h.num_habitacion, t.interno, t.hora_llegada, t.aseo, t.llamada, t.destino
                        FROM habitaciones h LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion ORDER BY NUM_HABITACION;`);
 
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

        const queryResult = await pool.query(`INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino, fecha_llegada)
                    VALUES ( '${interno}', ${num_habitacion}, '${hora_llegada}', '${aseo}', '${llamada}', '${destino}', '${fecha_llegada}'); `)

        await pool.query(`UPDATE habitaciones SET estado = 'Ocupada' WHERE num_habitacion = '${num_habitacion}' `);
    
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
        const queryResult = await pool.query(`select estado, num_habitacion, comentario from habitaciones order by num_habitacion;`);

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

        await pool.query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
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

// const historialHabitaciones = async ( body: any ) => {
//     try {

//         body.efectivo_valor_factura = body.efectivo_valor_factura || false;
//         body.efectivo_valor_ropa = body.efectivo_valor_ropa || false;
//         body.efectivo_tienda = body.efectivo_tienda || false;
//         body.fecha = getCurrentDateTime();

//         await pool.query(`
//             INSERT INTO historial (
//                 num_habitacion, hora_llegada, llamada, interno, placa, aseo, valor_hospedaje, valor_lavado, valor_parqueo, num_factura, valor_factura, comentario, cod_socio, 
//                 fechasalida, fechasistema, destino, hora_salida, valor_tienda, efectivo_valor_hospedaje, efectivo_valor_lavado, efectivo_valor_parqueo, efectivo_valor_factura, 
//                 efectivo_valor_ropa, efectivo_tienda, efectivo_aseo, ropa
//             ) VALUES (
//                 '${body.num_habitacion}', '${body.hora_llegada}', '${body.llamada}', '${body.interno}', '${body.placa}', '${body.aseo}', '${body.valor_hospedaje}', '${body.valor_lavado}',
//                 '${body.valor_parqueo}', '${body.num_factura}', '${body.valor_factura}', '${body.comentario}', '${body.socio}', '${body.fechaSalida}', '${body.fecha}', '${body.destino}', 
//                 '${body.hora_salida}', '${body.tienda}', '${body.efectivo_valor_hospedaje}', '${body.efectivo_valor_lavado}', '${body.efectivo_valor_porqueo}', '${body.efectivo_valor_factura}', 
//                 '${body.efectivo_valor_ropa}', '${body.efectivo_tienda}', '${body.efectivo_aseo}', '${body.ropa}' ); `);
        
//         await pool.query(`UPDATE habitaciones SET estado = 'Disponible' WHERE num_habitacion = '${body.num_habitacion}' `);         

//         return {
//             isError: false,
//             data: 'Registro exitoso'
//         };
//     } catch (error) {
//         console.log("ERROR al registrar una habitacion.");
//         console.log(error);
//         throw error;
//     }
// }


const historialHabitaciones = async (body: any) => {
    try {
        
        body.efectivo_valor_factura = body.efectivo_valor_factura || false;
        body.efectivo_valor_ropa = body.efectivo_valor_ropa || false;
        body.efectivo_tienda = body.efectivo_tienda || false;
        body.efectivo_aseo = body.efectivo_aseo || false;
        body.efectivo_aseo = body.efectivo_aseo || false;
        body.efectivo_valor_hospedaje = body.efectivo_valor_hospedaje || false;
        body.efectivo_valor_lavado = body.efectivo_valor_lavado || false;
        body.efectivo_valor_porqueo = body.efectivo_valor_porqueo || false;

        body.fechasistema = getCurrentDateTime(); 

        const query = `
            INSERT INTO historial (
                num_habitacion, hora_llegada, llamada, interno, placa, aseo, valor_hospedaje, valor_lavado, valor_parqueo, num_factura, valor_factura, comentario, cod_socio, 
                fechasalida, fechasistema, destino, hora_salida, valor_tienda, efectivo_valor_hospedaje, efectivo_valor_lavado, efectivo_valor_parqueo, efectivo_valor_factura, 
                efectivo_valor_ropa, efectivo_tienda, efectivo_aseo, ropa
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26 ) `;

        const values = [
            body.num_habitacion, body.hora_llegada, body.llamada, body.interno, body.placa, body.aseo, body.valor_hospedaje, body.valor_lavado,
            body.valor_parqueo, body.num_factura, body.valor_factura, body.comentario, body.socio, body.fechaSalida, body.fechasistema, body.destino,
            body.hora_salida, body.tienda, body.efectivo_valor_hospedaje, body.efectivo_valor_lavado, body.efectivo_valor_parqueo, body.efectivo_valor_factura,
            body.efectivo_valor_ropa, body.efectivo_tienda, body.efectivo_aseo, body.ropa
        ];

        await pool.query(query, values);

        await pool.query(`UPDATE habitaciones SET estado = 'Disponible' WHERE num_habitacion = $1`, [body.num_habitacion]);

        return {
            isError: false,
            data: 'Registro exitoso'
        };
    } catch (error) {
        console.log("ERROR al registrar una habitación.");
        console.log(error);
        throw error;
    }
};

function getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Formato compatible con TIMESTAMP: 'YYYY-MM-DD HH:mm:ss'
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const historial = async ( ) => {
    try {
       
        const queryResult = await pool.query(`SELECT * FROM historial h LEFT JOIN socios s ON h.cod_Socio = s.cod_socio ORDER by h.fechasistema DESC;`);

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


const validateSocio = async ( cod_socio: any ) => {
    try { 
    
        const queryResult = await pool.query(
            'SELECT nombre FROM socios WHERE cod_socio = $1',
            [cod_socio] );
   
           return {
               isError: false,
               data: queryResult.rows[0]
           };
       } catch (error) {
           console.log("ERROR al registrar usuario en la base de datos.");
           console.log(error);
           throw error;
       }
}

const cuadre_caja = async ( body: any ) => {
    try { 
     
         const values = body
            .map((row: any, index: any) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`)
            .join(", ");

            const flatValues = body.flat();

            const fechaHoraActual = new Date().toISOString();
            
            const query = ` INSERT INTO efectivoDia (fechaSistema, efectivo, value) VALUES ${values} `;
  
            await pool.query(query, [fechaHoraActual, ...flatValues]);
            console.log("Inserción exitosa");
        
       } catch (error) {
           console.log("ERROR al registrar usuario en la base de datos.");
           console.log(error);
           throw error;
       }
}

const flujoEfectivo = async ( ) => {
    try {
        
        const queryResult = await pool.query(
            `SELECT 
                SUM(CASE WHEN id <> 1 THEN CAST(efectivo AS numeric) ELSE 0 END) AS total_efectivo,
                SUM(CASE WHEN id = 1 THEN CAST(efectivo AS numeric) ELSE 0 END) AS base
            FROM efectivoDia; `);
     
           return {
               isError: false,
               data: queryResult.rows[0]
           };

    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
        console.log(error);
        throw error;        
    }
}

const totalEfectivo = async ( ) => {
    try {
        
        const queryResult = await pool.query(
            `select id, base, efectivoDia, total, fecha from historialEfectivo order by fecha DESC;`);
     
           return {
               isError: false,
               data: queryResult.rows[0]
           };

    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
        console.log(error);
        throw error;        
    }
}


const efectivo = async (body: any) => {
    try {

        const baseString = body.efectivoDelDia.replace('$', '').replace(/\s/g, ''); 
        const baseNumber = parseFloat(baseString.replace('.', '').replace(',', '.')); 

        const processedData = {
            base: parseInt(body.base.replace(/,/g, ''), 10),
            efectivoDelDia: baseNumber,
            total: body.total
        };
        
        await pool.query(
            `INSERT INTO historialEfectivo (base, efectivoDia, total)
                VALUES (${processedData.base}, ${processedData.efectivoDelDia}, ${processedData.total});`);

        await pool.query('delete from efectivoDia where id = 1');

        return {
            isError: false,
            data: 'Data insertada'
        };
    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
        console.log(error);
        throw error;        
    }
}


const updateBase = async (body: any) => {
    try {
     
        await pool.query(`update efectivoDia set efectivo =  ${body.inputValue} where id = 1`);

        return {
            isError: false,
            data: 'Data insertada'
        };
    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
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
    editar_tablero,
    validateSocio,
    cuadre_caja,
    flujoEfectivo,
    totalEfectivo,
    efectivo,
    updateBase
}

