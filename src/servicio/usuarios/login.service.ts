import dbConfig  from "../../config/dbConfig";
import bcrypt from "bcryptjs"; 
import { generarToken } from '../../config/auth'
const pool = dbConfig.pool;
const saltRounds = 10;

const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const registerUser = async (correo: string, password: string, nombre: string, cedula: string, telefono: string, rol: string) => { 
    try { 
        console.log('***** Registrando usuario en la base de datos *****');

        const validate = await pool.query(`select cedula from usuarios where cedula = '${cedula}'`);
        const validateCedula = validate.rows.length > 0 ? validate.rows[0].cedula : 0;
        // console.log(validateCedula);
        // console.log('deiby');
        // console.log(cedula);
        if(cedula != validateCedula ){
            // Encripta la contraseña antes de insertarla en la base de datos
            const encryptedPassword = await hashPassword(password);

            const queryResult = await pool.query(`INSERT INTO usuarios (correo, password, nombre, cedula, telefono, rol)
                    VALUES ('${correo}', '${encryptedPassword}', '${nombre}', '${cedula}', '${telefono}', '${rol}');`);
        
            return {
                isError: false,
                message: 'Usuario registrado'
            };
        }

        return {
            isError: false,
            message: 'Usuario ya registrado'
        };
        
    } catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
};

const login = async (correo: string, password: string) => {
    try { 
        console.log('***** Iniciando sesión *****');
        
        // Buscar el usuario por correo
        const queryResult = await pool.query(`SELECT * FROM usuarios where correo = '${correo}' ;`);
        console.log(queryResult.rows);
        if (queryResult.rows.length === 0) {
            return { 
                isError: true,
                data: 'Usuario no encontrado'
            };
        }

        const user = queryResult.rows[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log(passwordMatch);
        // console.log('deiby');
        if (!passwordMatch) {
            return {
                isError: true,
                data: 'Contraseña incorrecta'
            };
        }

        const token = generarToken(user);
        // console.log(token);
        return {
            isError: false,
            message: token
        };
    } catch (error) {
        console.log("ERROR en la autenticación.");
        console.log(error);
        throw error;
    }
};



export default {
    login,
    registerUser,
}
