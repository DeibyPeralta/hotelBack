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
// const updateSocios = async (body: any, schema: string) => {
//     const client = await pool.connect();
//     try {
//         console.log('*** Actualizando socios***');
//         for (let i = 0; i < body.length; i++) {
//             const socio = body[i];
//             const placa = socio.PLACA ? socio.PLACA : ' ';
//             const numInterno = socio.NROINTERNO ? socio.NROINTERNO : ' ';
//             const codPropietario = socio.COD_PROPIETARIO ? socio.COD_PROPIETARIO : ' ';
//             const cedula = socio.CC_PROPIETARIO ? socio.CC_PROPIETARIO : ' ';
//             const propietario = socio.PROPIETARIO ? socio.PROPIETARIO : ' ';
//             const telefono = socio.NUMERO ? socio.NUMERO : ' ';
//             const checkQuery = 'SELECT COUNT(*) FROM socios WHERE cod_socio = $1';
//             const { rows } = await client.query(checkQuery, [codPropietario]);
//             if (rows[0].count > 0) {
//                 console.log(`El cod_socio ${codPropietario} ya existe. No se puede duplicar.`);
//             } else {
//                 await client.query(`
//                     INSERT INTO socios (placa, cod_interno, cod_socio, cedula, nombre, telefono)
//                     VALUES ($1, $2, $3, $4, $5, $6)`,  
//                     [placa, numInterno, codPropietario, cedula, propietario, telefono]);
//             }
//             console.log(`Socio ${socio.PLACA} insertado correctamente.`);
//         }
//         return {
//             isError: false,
//             data: 'Datos insertados correctamente'
//         }
//     } catch (error) {
//         console.log('error al actualizar los socios');
//         console.log(error);
//     }finally {
//         client.release();
//     }
// }
const updateSocios = (body, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        // console.log('*** Actualizando socios ***');    
        // Establecer el esquema para las consultas
        yield client.query(`SET search_path TO ${schema}`);
        for (let i = 0; i < body.length; i++) {
            const socio = body[i];
            const placa = socio.PLACA || ' ';
            const numInterno = socio.NROINTERNO || ' ';
            const codPropietario = socio.CODIGO || ' ';
            const cedula = socio.CEDULA || ' ';
            const propietario = socio.PROPIETARIO || ' ';
            const telefono = socio.TELEFONO || ' ';
            // CHECK existente
            // const checkQuery = 'SELECT COUNT(*) FROM socios WHERE cod_interno = $1 and placa = $2';
            // const checkValues = [numInterno, placa];
            // const { rows } = await client.query(checkQuery, checkValues);
            // if (rows[0].count > 1) {
            //     console.log(`El interno ${codPropietario} ya existe. No se puede duplicar.`);
            // } else {
            const insertQuery = `
                    INSERT INTO socios (placa, cod_interno, cod_socio, cedula, nombre, telefono)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT (placa, cod_interno)
                    DO UPDATE SET 
                        cod_socio = EXCLUDED.cod_socio,
                        cedula = EXCLUDED.cedula,
                        nombre = EXCLUDED.nombre,
                        telefono = EXCLUDED.telefono;`;
            const insertValues = [placa, numInterno, codPropietario, cedula, propietario, telefono];
            // Mostrar query en consola con valores interpolados (solo para debug)
            // const interpolatedQuery = insertQuery.replace(/\$\d+/g, (match: string) => {
            //     const index = parseInt(match.substring(1)) - 1;
            //     const val = insertValues[index];
            //     return `'${val}'`;
            // });
            // console.log('Insert query:', interpolatedQuery);
            yield client.query(insertQuery, insertValues);
            // }
        }
        return {
            isError: false,
            data: 'Datos insertados correctamente'
        };
    }
    catch (error) {
        console.log('❌ Error al actualizar los socios');
        console.error(error);
        return {
            isError: true,
            data: 'Error al insertar socios'
        };
    }
    finally {
        client.release();
    }
});
// const updateSocios = async (body: any[], schema: string) => {
//     const client = await pool.connect();
//     try {
//       console.log('*** Actualizando socios ***');
//       // Establecer el esquema activo
//       await client.query(`SET search_path TO ${schema}`);
//       for (let i = 0; i < body.length; i++) {
//         const socio = body[i];
//         const placa = socio.PLACA || ' ';
//         const numInterno = socio.NROINTERNO || ' ';
//         const codPropietario = socio.COD_PROPIETARIO || ' ';
//         const cedula = socio.CC_PROPIETARIO || ' ';
//         const propietario = socio.PROPIETARIO || ' ';
//         const telefono = socio.NUMERO || ' ';
//         // Construir la consulta
//         const upsertQuery = `
//           INSERT INTO socios (placa, cod_interno, cod_socio, cedula, nombre, telefono)
//           VALUES ($1, $2, $3, $4, $5, $6)
//           ON CONFLICT (placa, cod_interno)
//           DO UPDATE SET 
//             cod_socio = EXCLUDED.cod_socio,
//             cedula = EXCLUDED.cedula,
//             nombre = EXCLUDED.nombre,
//             telefono = EXCLUDED.telefono;
//         `;
//         const values = [placa, numInterno, codPropietario, cedula, propietario, telefono];
//         // Mostrar la consulta en consola para debug
//         const interpolatedQuery = upsertQuery.replace(/\$\d+/g, (match: string) => {
//           const index = parseInt(match.substring(1)) - 1;
//           const val = values[index];
//           return typeof val === 'string' ? `'${val}'` : val;
//         });
//         console.log(`➡ Ejecutando SQL: ${interpolatedQuery}`);
//         // Ejecutar el UPSERT
//         await client.query(upsertQuery, values);
//         console.log(`✔ Socio ${placa} insertado o actualizado.`);
//       }
//       return {
//         isError: false,
//         data: 'Todos los socios fueron procesados correctamente.'
//       };
//     } catch (error) {
//       console.log('❌ Error al actualizar los socios');
//       console.error(error);
//       return {
//         isError: true,
//         data: 'Ocurrió un error al insertar o actualizar socios.'
//       };
//     } finally {
//       client.release();
//     }
// };
const getsocios = (schema) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        yield client.query(`SET search_path TO ${schema}`);
        const queryResult = yield client.query(`select id, placa, cod_interno, cod_socio, cedula, nombre, telefono from socios;`);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log('error al cargar los socios');
        console.log(error);
    }
    finally {
        client.release();
    }
});
const updateSocio = (data, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        yield client.query(`SET search_path TO ${schema}`);
        console.log(data);
        const queryResult = yield client.query(`update socios set cod_socio = $1, nombre = $2 where id = $5`, [data.cod_socio, data.nombre, data.id]);
        return {
            isError: false,
            data: queryResult.rows
        };
    }
    catch (error) {
        console.log('error al cargar los socios');
        console.log(error);
    }
    finally {
        client.release();
    }
});
function printQueryWithValues(query, values) {
    const interpolated = query.replace(/\$\d+/g, (match) => {
        const index = parseInt(match.substring(1), 10) - 1;
        const val = values[index];
        if (typeof val === 'string') {
            return `'${val.replace(/'/g, "''")}'`; // escapar comillas simples
        }
        return val;
    });
    console.log('🟡 Query ejecutada:');
    console.log(interpolated);
}
exports.default = {
    updateSocios,
    getsocios,
    updateSocio,
};
