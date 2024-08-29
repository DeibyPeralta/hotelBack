import dbConfig  from "../../config/dbConfig";
const pool = dbConfig.pool;

const updateSocios = async (body: any) => {
    try {

        console.log('*** Actualizando socios***');
        for (let i = 0; i < body.length; i++) {
            const socio = body[i];


            const placa = socio.PLACA ? socio.PLACA : ' ';
            const numInterno = socio.NROINTERNO ? socio.NROINTERNO : ' ';
            const codPropietario = socio.COD_PROPIETARIO ? socio.COD_PROPIETARIO : ' ';
            const cedula = socio['C.C.'] ? socio['C.C.'] : ' ';
            const propietario = socio.PROPIETARIO ? socio.PROPIETARIO : ' ';
            const telefono = socio.TELEFONO ? socio.TELEFONO : ' ';

          const queryResult = await pool.query(`
                INSERT INTO socios (placa, cod_interno, cod_socio, cedula, nombre, telefono)
                VALUES ('${placa}', '${numInterno}', '${codPropietario}', '${cedula}', '${propietario}', '${telefono}')
            `);

            console.log(`Socio ${socio.PLACA} insertado correctamente.`);
        }

        return {
            isError: false,
            data: 'Datos insertados correctamente'
        }
    } catch (error) {
        console.log('error al actualizar los socios');
        console.log(error);
    }
}

const getsocios = async () => {
    try {

        console.log('*** Cargar socios ***');
        // const queryResult = await pool.query(`select * from socios where cod_interno='${cod_interno}')`)
        const queryResult = await pool.query(`select placa, cod_interno, cod_socio, cedula, nombre, telefono from socios;`)
        
        return {
            isError: false,
            data: queryResult.rows
        }
    } catch (error) {
        console.log('error al cargar los socios');
        console.log(error);
    }
}

const updateSocio = async (data: any) => {
    console.log('*** Edit socio by id ***');
    // const queryResult = await pool.query(`select * from socios where cod_interno='${cod_interno}')`)
    const queryResult = await pool.query(`update socios set cod_interno = '${data.cod_interno}', placa = '${data.placa}' where id = '${data.cedula}'`)
    
    return {
        isError: false,
        data: queryResult.rows
    }
}

export default {
    updateSocios,
    getsocios,
    updateSocio,
}