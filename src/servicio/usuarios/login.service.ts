import dbConfig  from "../../config/dbConfig";
import bcrypt from "bcryptjs"; 
import { generarToken } from '../../config/auth'
const pool = dbConfig.pool;
const saltRounds = 10;

const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const registerUser = async (correo: string, password: string, nombre: string, cedula: string, telefono: string, schema: string) => { 
    const client = await pool.connect();

    try { 
        await client.query(`SET search_path TO ${schema}`);
         
        const queryResult = await client.query(`SELECT cedula FROM usuarios WHERE cedula = $1`, [cedula]);
 
        const validateCedula = queryResult.rows.length > 0 ? queryResult.rows[0].cedula : 0;
           
        if(cedula != validateCedula ){
      
            const encryptedPassword = await hashPassword(password);

            const query = `INSERT INTO usuarios (correo, password, nombre, cedula, telefono, rol)
                            VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (cedula) DO NOTHING;`;
            const values = [correo, encryptedPassword, nombre, cedula, telefono, 2]

            await client.query(query, values); 
         
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
    }finally {
        client.release();
    }
};

const login = async (correo: string, password: string, schema: string) => {
    const client = await pool.connect();
    try {
        
      await client.query(`SET search_path TO ${schema}`);
  
      const query = `
        SELECT id, correo, password, nombre, cedula, telefono, rol
        FROM usuarios
        WHERE correo = $1 `;
      const values = [correo];

      const queryResult = await client.query(query, values); 
  
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
    } finally {
      client.release();
    }
};
 
const permisos = async (schema: string) => {
    const client = await pool.connect();
    try {
        await client.query(`SET search_path TO ${schema}`);
        const query = `select id, correo, nombre, telefono, rol from usuarios`;

        const queryResult = await client.query(query)

        return queryResult.rows
    } catch (error) {
        throw error;
    }  finally {
        client.release();
    }
}

const editPermisos = async ( correo: string, nombre: string, telefono: string, rol: string, id: string, password: string, schema: string ) => {
  const client = await pool.connect();
  try {
    await client.query(`SET search_path TO ${schema}`);

    let query: string;
    let values: any[];

    if (password && password.trim() !== "") {
      const hashedPassword = await hashPassword(password);
      query = `
        UPDATE usuarios
        SET correo = $1, nombre = $2, telefono = $3, rol = $4, password = $5
        WHERE id = $6
        RETURNING id, correo, nombre, telefono, rol; `;
      values = [correo, nombre, telefono, rol, hashedPassword, id];
    } else {
      query = `
        UPDATE usuarios
        SET correo = $1, nombre = $2, telefono = $3, rol = $4
        WHERE id = $5 RETURNING id, correo, nombre, telefono, rol;
      `;
      values = [correo, nombre, telefono, rol, id];
    }

    const queryResult = await client.query(query, values);
    return queryResult.rows[0];
  } catch (error) {
    console.error("ERROR al editar permisos del usuario:", error);
    throw error;
  } finally {
    client.release();
  }
};

// const editPermisos = async (correo: string, nombre: string, telefono: string, rol: string, id: string, password: string, schema: string) => {
//     const client = await pool.connect();
//     try {
//         await client.query(`SET search_path TO ${schema}`);

//         const query = ` UPDATE usuarios
//                 SET correo = $1, nombre = $2, telefono = $3, rol = $4
//                 WHERE id = $5 RETURNING id, correo, nombre, telefono, rol `;
    
//         const values = [correo, nombre, telefono, rol, id];
    
//         const queryResult = await client.query(query, values);
    
//         return queryResult.rows[0]; 
//     } catch (error) {
//       console.error("ERROR al editar permisos del usuario:", error);
//       throw error;
//     }finally {
//         client.release();
//     }
// };

const deleteUsers = async (id: string, schema: string) => {
    const client = await pool.connect();
    try {
        await client.query(`SET search_path TO ${schema}`);

        const queryResult = await client.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    
        return queryResult.rows[0]; 
    } catch (error) {
      console.error("ERROR al editar permisos del usuario:", error);
      throw error;
    }finally {
        client.release();
    }
};
  
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
    login,
    registerUser,
    permisos,
    editPermisos,
    deleteUsers
}
