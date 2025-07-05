import dbConfig  from "../../config/dbConfig";
import bcrypt from "bcryptjs"; 
import { generarToken } from '../../config/auth'
const pool = dbConfig.pool;
const saltRounds = 10;

const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const registerUser = async (correo: string, password: string, nombre: string, cedula: string, telefono: string) => { 
    try { 
        console.log('***** Registrando usuario en la base de datos *****');
         
        const validate = await pool.query(`SELECT cedula FROM usuarios WHERE cedula = $1`,[cedula] );
        const validateCedula = validate.rows.length > 0 ? validate.rows[0].cedula : 0;
           
        if(cedula != validateCedula ){
      
            const encryptedPassword = await hashPassword(password);

            await pool.query( `INSERT INTO usuarios (correo, password, nombre, cedula, telefono, rol)
                    VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (cedula) DO NOTHING;`, [correo, encryptedPassword, nombre, cedula, telefono, 2] );
                
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
        const queryResult = await pool.query(`SELECT id, correo, password, nombre, cedula, telefono, rol FROM usuarios where correo = '${correo}' ;`);
        
        if (queryResult.rows.length === 0) {
            return { 
                isError: true,
                data: 'Usuario no encontrado'
            };
        }

        const user = queryResult.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {
                isError: true,
                data: 'Contraseña incorrecta'
            };
        }

        const tokenPayload = {
            id: user.id,
            nombre: user.nombre,
            rol: user.rol 
        };
        
        const token = generarToken(tokenPayload);
        
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

const permisos = async () => {
    try {
        const queryResult = await pool.query(`select id, correo, nombre, telefono, rol from usuarios`);

        return queryResult.rows
    } catch (error) {
        throw error;
    }  
}

const editPermisos = async (correo: string, nombre: string, telefono: string, rol: string, id: string) => {
    try {
      const query = ` UPDATE usuarios
            SET correo = $1, nombre = $2, telefono = $3, rol = $4
            WHERE id = $5 RETURNING id, correo, nombre, telefono, rol `;
  
      const values = [correo, nombre, telefono, rol, id];
  
      const queryResult = await pool.query(query, values);
  
      return queryResult.rows[0]; 
    } catch (error) {
      console.error("ERROR al editar permisos del usuario:", error);
      throw error;
    }
};

const deleteUsers = async (id: string) => {
    try {
      const query = `DELETE FROM usuarios WHERE id = $1`;
  
      const values = [id];
  
      const queryResult = await pool.query(query, values);
     
      return queryResult.rows[0]; 
    } catch (error) {
      console.error("ERROR al editar permisos del usuario:", error);
      throw error;
    }
};
  


export default {
    login,
    registerUser,
    permisos,
    editPermisos,
    deleteUsers
}
