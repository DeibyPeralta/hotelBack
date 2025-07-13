import dbConfig  from "../../config/dbConfig";
const pool = dbConfig.pool;

const updateSocios = async (body: any) => {
    const client = await pool.connect();
    try {

        console.log('*** Actualizando socios***');
        for (let i = 0; i < body.length; i++) {
            const socio = body[i];

            console.log(socio)

            const placa = socio.PLACA ? socio.PLACA : ' ';
            const numInterno = socio.NROINTERNO ? socio.NROINTERNO : ' ';
            const codPropietario = socio.COD_PROPIETARIO ? socio.COD_PROPIETARIO : ' ';
            const cedula = socio.CC_PROPIETARIO ? socio.CC_PROPIETARIO : ' ';
            const propietario = socio.PROPIETARIO ? socio.PROPIETARIO : ' ';
            const telefono = socio.NUMERO ? socio.NUMERO : ' ';

            const checkQuery = 'SELECT COUNT(*) FROM socios WHERE cod_socio = $1';
            const { rows } = await pool.query(checkQuery, [codPropietario]);

            if (rows[0].count > 0) {
                console.log(`El cod_socio ${codPropietario} ya existe. No se puede duplicar.`);
            } else {
                await pool.query(`
                    INSERT INTO socios (placa, cod_interno, cod_socio, cedula, nombre, telefono)
                    VALUES ('${placa}', '${numInterno}', '${codPropietario}', '${cedula}', '${propietario}', '${telefono}') `);
            }
            
            console.log(`Socio ${socio.PLACA} insertado correctamente.`);
        }

        return {
            isError: false,
            data: 'Datos insertados correctamente'
        }
    } catch (error) {
        console.log('error al actualizar los socios');
        console.log(error);
    }finally {
        client.release();
    }
}

const getsocios = async () => {
    const client = await pool.connect();
    try {

        console.log('*** Cargar socios ***');
        const queryResult = await pool.query(`select placa, cod_interno, cod_socio, cedula, nombre, telefono from socios;`)
        
        return {
            isError: false,
            data: queryResult.rows
        }
    } catch (error) {
        console.log('error al cargar los socios');
        console.log(error);
    }finally {
        client.release();
    }
}

const updateSocio = async (data: any) => {
    const client = await pool.connect();
 
    try {
        const queryResult = await pool.query(`update socios set cod_interno = '${data.cod_interno}', nombre = '${data.nombre}',
            placa = '${data.placa}', telefono = '${data.telefono}' where cedula = '${data.cedula}';`)
        
        return {
            isError: false,
            data: queryResult.rows
        }
    } catch (error) {
        console.log('error al cargar los socios');
        console.log(error);
    }finally {
        client.release();
    }
}

export default {
    updateSocios,
    getsocios,
    updateSocio,
}