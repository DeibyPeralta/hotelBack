import dbConfig  from "../../config/dbConfig";
const pool = dbConfig.pool;

const vista = async (schema: string) => {
    const client = await pool.connect();

    try {
       
        await client.query(`SET search_path TO ${schema}`);       

        const queryResult = await client.query(`
            SELECT h.num_habitacion, h.estado, t.interno, t.hora_llegada, 
                   t.aseo, t.llamada, t.destino, s.placa, s.nombre, 
                   s.cod_socio, s.placa
            FROM habitaciones h 
            LEFT JOIN tablero t ON h.num_habitacion = t.num_habitacion 
            LEFT JOIN socios s ON t.interno = s.cod_interno
            ORDER BY h.num_habitacion ASC `);
        
        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.error("ERROR al obtener datos del tablero:", error);
        throw error;
    } finally {
        client.release(); 
    }
};

const maxhabitaciones = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`); 
        const queryResult = await client.query(`SELECT MAX(num_habitacion) AS max_num_habitacion FROM habitaciones;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const addTablero = async ( interno: string, num_habitacion: string, hora_llegada: string, aseo: string, llamada: string, destino: string, fecha_llegada: any, schema: string ) => {
    const client = await pool.connect();
    try {           
        await client.query(`SET search_path TO ${schema}`);

        const habitacionResult = await client.query(`SELECT estado FROM habitaciones WHERE num_habitacion = $1`, [num_habitacion]);
           
        const estado = habitacionResult.rows[0].estado;
    
        if (estado.toLowerCase() !== 'disponible') {
            return {
                isError: true,
                message: `La habitación ${num_habitacion} no está disponible, esta ${estado}`,
            };
        }
    
        // Insertar en tablero
        const query = `INSERT INTO tablero (interno, num_habitacion, hora_llegada, aseo, llamada, destino, fecha_llegada)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        
        const values = [interno, num_habitacion, hora_llegada, aseo, llamada, destino, fecha_llegada] 
    
        const queryResult = await client.query(query, values);

        await client.query(`UPDATE habitaciones SET estado = 'Ocupada' WHERE num_habitacion = $1`, [num_habitacion]);               

        return {
            isError: false,
            message: 'Habitación registrada correctamente',
            data: queryResult.rows[0],
        };
    } catch (error) {
      throw error;
    }finally {
        client.release();
    }
};
  
const habitaciones = async (schema: string) => {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`); 

        const queryResult = await client.query(`select estado, num_habitacion, comentario from habitaciones order by num_habitacion;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const editar_Habitaciones = async (body: any, schema: string) => {
    const client = await pool.connect();
    try { 
     
        await client.query(`SET search_path TO ${schema}`); 

        await client.query(`UPDATE habitaciones SET estado = $1, comentario = $2
                     WHERE num_habitacion = $3`, [body.estado, body.comentario, body.num_habitacion]);

        return {
            isError: false,
            data: 'ok'
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const addHabitaciones = async ( body: any, schema: string) => {
    const client = await pool.connect();
    try {
        // console.log('***** Añadiendo datos del tablero *****');
        await client.query(`SET search_path TO ${schema}`);   

        await client.query(`INSERT INTO habitaciones (estado, num_habitacion, comentario)
            VALUES ($1, $2, $3)`, [body.estado, body.num_habitacion, body.comentario]);
   
        return {
            isError: false,
            data: 'ok'
        };
    } catch (error) {
        console.log("ERROR al registrar una habitacion.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const historialHabitaciones = async (body: any, schema: string) => {
    const client = await pool.connect();
    try {
 
        await client.query(`SET search_path TO ${schema}`);   

        body.efectivo_valor_factura = body.efectivo_valor_factura || false;
        body.efectivo_valor_ropa = body.efectivo_valor_ropa || false;
        body.efectivo_tienda = body.efectivo_tienda || false;
        body.efectivo_aseo = body.efectivo_aseo || false;
        body.efectivo_valor_hospedaje = body.efectivo_valor_hospedaje || false;
        body.efectivo_valor_lavado = body.efectivo_valor_lavado || false;
        body.efectivo_valor_parqueo = body.efectivo_valor_porqueo || false;

        body.fechasistema = getCurrentDateTime();
   
        const query = `
            INSERT INTO historial (
                num_habitacion, hora_llegada, llamada, interno, placa, aseo, valor_hospedaje, valor_lavado, valor_parqueo, num_factura, valor_factura, 
                comentario, cod_socio, fechasalida, fechasistema, destino, hora_salida, valor_tienda, efectivo_valor_hospedaje, efectivo_valor_lavado, 
                efectivo_valor_parqueo, efectivo_valor_factura, efectivo_valor_ropa, efectivo_tienda, efectivo_aseo, ropa, registered_by ) 
            VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
                    $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27 ); `; 

        const values = [
            body.num_habitacion, body.hora_llegada, body.llamada, body.interno, body.placa, body.aseo,
            body.valor_hospedaje, body.valor_lavado, body.valor_parqueo, body.num_factura, body.valor_factura,
            body.comentario, body.socio, body.fechaSalida, body.fechasistema, body.destino, body.hora_salida,
            body.tienda, body.efectivo_valor_hospedaje, body.efectivo_valor_lavado, body.efectivo_valor_parqueo,
            body.efectivo_valor_factura, body.efectivo_valor_ropa, body.efectivo_tienda, body.efectivo_aseo,
            body.ropa, body.usuario
        ];

        await client.query(query, values);

        await client.query(  `UPDATE habitaciones SET estado = 'Disponible' WHERE num_habitacion = $1`, [body.num_habitacion] );

        // console.log('QUERY PARA DEBUG:');
        // console.log(
        //     query.replace(/\$\d+/g, (match) => {
        //         const index = parseInt(match.substring(1)) - 1;
        //         const val = values[index];
        //         return typeof val === 'string' ? `'${val}'` : val;
        //     })
        // );

        return {
            isError: false,
            data: 'Registro exitoso'
        };
    } catch (error) {
        console.log("ERROR al registrar una habitación.");
        console.log(error);
        throw error;
    }finally {
        client.release();
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

const historial = async (schema:string ) => {
    const client = await pool.connect();
    try {
       
        await client.query(`SET search_path TO ${schema}`);  

        const queryResult = await client.query(`
            SELECT h.id, interno, num_habitacion, hora_llegada, comentario, hora_salida, s.placa, 
					h.valor_hospedaje, h.efectivo_valor_hospedaje, valor_lavado, h.efectivo_valor_lavado, h.valor_parqueo, h.notaJustificante,
                    h.efectivo_valor_parqueo, h.num_factura, valor_factura, h.valor_tienda, s.nombre, h.fechasalida, h.fechasistema, h.efectivo_valor_ropa, h.ropa, h.registered_by
            FROM historial h 
            LEFT JOIN socios s 
                ON h.cod_Socio = s.cod_socio 
            ORDER by h.fechasistema DESC;`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const updateHistorial = async ( body: any, schema: string) => {
    const client = await pool.connect();
    try {        

        await client.query(`SET search_path TO ${schema}`);     

        const queryResult = await client.query(`
            UPDATE historial SET
              num_habitacion = $1,
              interno = $2, hora_llegada = $3, valor_factura = $4, comentario = $5, hora_salida = $6, fechasalida = $7,
              efectivo_valor_hospedaje = $8,
              efectivo_valor_lavado = $9,
              efectivo_valor_parqueo = $10,
              efectivo_valor_ropa = $11,
              valor_hospedaje = $12,
              valor_lavado = $13,
              valor_parqueo = $14,
              valor_tienda = $15,
              ropa = $16,
              notaJustificante = $17
            WHERE id = $18 `, [ 
                body.num_habitacion, body.interno, body.hora_llegada, body.valor_factura, body.comentario, body.hora_salida, 
                body.fecha, body.efectivo_valor_hospedaje, body.efectivo_valor_lavado, body.efectivo_valor_parqueo, 
                body.efectivo_valor_ropa, body.valor_hospedaje, body.valor_lavado, body.valor_parqueo, body.valor_tienda, body.ropa, body.justificacion, body.id
             ]);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const deleteHabitaciones = async ( num_habitacion: any, schema: string) => {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query(`delete from tablero where num_habitacion = $1`, [num_habitacion]);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al eliminar huesped de la habitacion.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const editar_tablero = async ( body: any, schema: string) => {
    const client = await pool.connect();
    try { 

        await client.query(`SET search_path TO ${schema}`);

        await client.query(`UPDATE tablero SET  hora_llegada = $1, aseo = $2, llamada = $3, destino = $4
            WHERE  num_habicion = $5 OR interno = $6`, 
            [body.hora_llegada, body.aseo, body.llamada, body.destino, body.num_habitacion, body.interno]);
    
        return {
            isError: false,
            data: 'ok'
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const validateSocio = async ( cod_socio: any, schema: string) => {
    const client = await pool.connect();
    try { 
        await client.query(`SET search_path TO ${schema}`);  
    
        const queryResult = await client.query( `SELECT nombre FROM socios WHERE cod_socio = $1 OR LOWER(nombre) ILIKE '%' || LOWER($1) || '%'`,  [cod_socio] );
   
           return {
               isError: false,
               data: queryResult.rows[0]
           };
       } catch (error) {
           console.log("ERROR al registrar usuario en la base de datos.");
           console.log(error);
           throw error;
       }finally {
        client.release();
    }
}

const cuadre_caja = async ( body: any, schema: string) => {
    const client = await pool.connect();
    try { 
     
        await client.query(`SET search_path TO ${schema}`);

         const values = body
            .map((row: any, index: any) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`)
            .join(", ");

            const flatValues = body.flat();

            const fechaHoraActual = new Date().toISOString();
            
            const query = ` INSERT INTO efectivoDia (fechaSistema, efectivo, value) VALUES ${values} `;
  
            await client.query(query, [fechaHoraActual, ...flatValues]);
            console.log("Inserción exitosa");
        
       } catch (error) {
           console.log("ERROR al registrar usuario en la base de datos.");
           console.log(error);
           throw error;
       }finally {
        client.release();
    }
}

const flujoEfectivo = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query( `        
                SELECT 
                    SUM(CASE 
                            WHEN id <> 1 AND efectivo ~ '^[0-9]+$' 
                            THEN CAST(efectivo AS numeric) 
                            ELSE 0 
                        END) AS total_efectivo,
                    SUM(CASE 
                            WHEN id = 1 AND efectivo ~ '^[0-9]+$' 
                            THEN CAST(efectivo AS numeric) 
                            ELSE 0 
                        END) AS base
                FROM efectivoDia;`);
     
           return {
               isError: false,
               data: queryResult.rows[0]
           };

    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
        console.log(error);
        throw error;        
    }finally {
        client.release();
    }
}

const totalEfectivo = async (schema: string)=> {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`);
        
        const queryResult = await client.query(`select id, base, efectivoDia, total, fecha from historialEfectivo order by fecha DESC;`);
     
           return {
               isError: false,
               data: queryResult.rows[0]
           };

    } catch (error) {
        console.log("ERROR al cargar el flujo de caja de la base de datos.");
        console.log(error);
        throw error;        
    }finally {
        client.release();
    }
}

const efectivo = async (body: any, schema: string) => {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`);

        const efectivoString = body.efectivoDelDia.replace('$', '').replace(/\s/g, '');
        const efectivoNumber = parseFloat(efectivoString.replace('.', '').replace(',', '.'));
        const baseString = body.base.replace('$', '').replace(/\s/g, '');
        const baseNumber = parseFloat(baseString.replace('.', '').replace(',', '.'));
        const totalString = body.total.replace('$', '').replace(/\s/g, '');
        const totalNumber = parseFloat(totalString.replace('.', '').replace(',', '.'));
        const pagosRealizadosString = body.pagosRealizados.replace('$', '').replace(/\s/g, '');
        const pagosRealizadosNumber = parseFloat(pagosRealizadosString.replace('.', '').replace(',', '.'));
    
        const processedData = {
            base: baseNumber,
            efectivoDelDia: efectivoNumber,
            pagosRealizados: pagosRealizadosNumber,
            total: totalNumber
        };
    
        const { rowCount } = await client.query(`SELECT 1 FROM historialEfectivo WHERE turno = $1 AND fechaturno = CURRENT_DATE`, [body.turno] );
    
        if (rowCount === 0) {
            await client.query(
            `INSERT INTO historialEfectivo (base, efectivoDia, total, usuario, turno, pagosdeldia, fechaturno)
                VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)`,
            [ processedData.base, processedData.efectivoDelDia, processedData.total, body.usuario, body.turno, processedData.pagosRealizados ]
            );
        }
    
        await client.query('DELETE FROM efectivoDia WHERE id <> 1;');
    
        await client.query(`UPDATE gastosdiarios SET historial = true WHERE historial = false;`)

      return {
        isError: false,
        data: rowCount === 0 ? 'Data insertada' : 'Ya existía un registro para este turno'
      };
    } catch (error) {
      console.error('ERROR al insertar el flujo de caja en la base de datos.');
      console.error(error);
      throw error;
    }finally {
        client.release();
    }
};
  
const updateBase = async (body: any, schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);
        await client.query(`update efectivoDia set efectivo =  $1 where id = 1`, [body.inputValue]);

        return {
            isError: false,
            data: 'Data insertada'
        };
    } catch (error) {
        throw error;        
    }finally {
        client.release();
    }
}

const historialcajaBase = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query(`SELECT id, base, efectivodia, total, TO_CHAR(fecha, 'DD-MM-YYYY') AS fecha, usuario, pagosdeldia as pagos, turno
             FROM historialEfectivo ORDER BY fecha DESC`);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        throw error;        
    }finally {
        client.release();
    }
}

const historialGraficos = async (filtros: { socio?: string, fechasistema?: string } = {}, schema: string) => {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`);
        
        let baseQuery = `
            SELECT interno, num_habitacion, hora_llegada, aseo, llamada, destino, comentario, hora_salida, s.placa, 
                    h.valor_hospedaje, valor_lavado, h.valor_parqueo, h.num_factura, valor_factura, h.valor_tienda, s.nombre, 
                    h.fechasalida, h.fechasistema FROM historial h 
            LEFT JOIN socios s 
                ON h.cod_Socio = s.cod_socio   `;
        const conditions = [];
        const values = [];

        if (filtros.socio) {
            conditions.push('s.nombre ILIKE $' + (values.length + 1));
            values.push(`%${filtros.socio}%`);
        }   
        if (filtros.fechasistema) {
            const [from, to] = filtros.fechasistema.split(',');
            if (from) {
                conditions.push('h.fechasistema >= $' + (values.length + 1));
                values.push(from);
            }
            if (to) {
                conditions.push('h.fechasistema <= $' + (values.length + 1));
                values.push(to);
            }
        }

        if (conditions.length > 0) {
            baseQuery += ' WHERE ' + conditions.join(' AND ');
        }
        baseQuery += ' ORDER BY h.fechasistema DESC';

        const queryResult = await client.query(baseQuery, values);

        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const habitacionesDisponibles = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);
        const queryResult = await client.query(`SELECT num_habitacion FROM habitaciones WHERE estado = 'Disponible' `);
      
        return {
            isError: false,
            data: queryResult.rows
        };;
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const insertGastosDiarios = async (body: any, schema: string) => {
    const client = await pool.connect();
    try {

        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query(`
            INSERT INTO gastosdiarios(efectivodia, descripcion, usuario, historial, fecha) 
                VALUES($1, $2, $3, false, now()) RETURNING *`, [body.valor, body.descripcion, body.usuario]);
      
        return {
            isError: false,
            data: queryResult
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const getGastosDiarios = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);
    
        const queryResult = await client.query(`SELECT id, efectivodia, descripcion, usuario, historial, fecha FROM gastosdiarios ORDER BY fecha DESC;`);
       
        return {
            isError: false,
            data: queryResult.rows
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const totalGastosDiarios = async (schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query(`SELECT SUM(efectivodia) AS total_actual FROM gastosdiarios WHERE historial = false;`);
        
        return {
            isError: false,
            data: queryResult.rows[0].total_actual
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

const internoPlaca = async (interno: string, schema: string) => {
    const client = await pool.connect();
    try {
        
        await client.query(`SET search_path TO ${schema}`);
  
        const queryResult = await client.query(`SELECT cod_socio AS socio, placa
                FROM  socios WHERE cod_interno = $1`, [interno] );
        
        return {
            isError: false,
            data: queryResult.rows[0]
        };
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
}

// function printQueryWithValues(query: string, values: any[]) {
//     // printQueryWithValues(validate, valueValidate);
//   const interpolated = query.replace(/\$\d+/g, (match: string) => {
//     const index = parseInt(match.substring(1), 10) - 1;
//     const val = values[index];
//     if (typeof val === 'string') {
//       return `'${val.replace(/'/g, "''")}'`; // escapar comillas simples
//     }
//     return val;
//   });
//   console.log('🟡 Query ejecutada:');
//   console.log(interpolated);
// }

export default {
    vista,
    totalGastosDiarios,
    maxhabitaciones,
    addTablero,
    habitaciones,
    editar_Habitaciones,
    addHabitaciones,
    historialHabitaciones,
    historial,
    updateHistorial,
    deleteHabitaciones,
    editar_tablero,
    validateSocio,
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
    internoPlaca
}
