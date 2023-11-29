import dbConfig from "../../config/dbConfig";
import sql from "mssql";
import bcrypt from "bcryptjs"; 

const saltRounds = 10;

const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const registerUser = async (correo: string, password: string, nombre: string, cedula: string, telefono: string, rol: number) => { 
    try { 
        console.log('***** Registrando usuario en la base de datos *****');
        const pool = await sql.connect(dbConfig);

        // Encripta la contraseña antes de insertarla en la base de datos
        const encryptedPassword = await hashPassword(password);

        const queryResult = await pool.request()
            .input('correo', sql.VarChar, correo)
            .input('password', sql.VarChar, encryptedPassword)
            .input('nombre', sql.VarChar, nombre)
            .input('cedula', sql.VarChar, cedula)
            .input('telefono', sql.VarChar, telefono)
            .input('rol', sql.Int, rol)
            .query('INSERT INTO usuarios (correo, password, nombre, cedula, telefono, rol) VALUES (@correo, @password, @nombre, @cedula, @telefono, @rol);');
        
        return {
            isError: false,
            message: queryResult.recordset
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
        const pool = await sql.connect(dbConfig);

        // Buscar el usuario por correo
        const queryResult = await pool.request()
            .input('correo', sql.VarChar, correo)
            .query('SELECT * FROM usuarios WHERE correo = @correo;');
            // .input('password', sql.VarChar, password)

        if (queryResult.recordset.length === 0) {
            return {
                isError: true,
                data: 'Usuario no encontrado'
            };
        }

        const user = queryResult.recordset[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {
                isError: true,
                data: 'Contraseña incorrecta'
            };
        }
        
        return {
            isError: false,
            data: user
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
