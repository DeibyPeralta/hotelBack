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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../../config/auth");
const pool = dbConfig_1.default.pool;
const saltRounds = 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
    return hashedPassword;
});
const registerUser = (correo, password, nombre, cedula, telefono, rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('***** Registrando usuario en la base de datos *****');
        const validate = yield pool.query('select correo, cedula from usuarios');
        const validateCedula = validate.rows[0].cedula;
        // console.log(validate.rows[0].cedula);
        if (cedula != validateCedula) {
            // Encripta la contraseña antes de insertarla en la base de datos
            const encryptedPassword = yield hashPassword(password);
            const queryResult = yield pool.query(`INSERT INTO usuarios (correo, password, nombre, cedula, telefono, rol)
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
    }
    catch (error) {
        console.log("ERROR al registrar usuario en la base de datos.");
        console.log(error);
        throw error;
    }
});
const login = (correo, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('***** Iniciando sesión *****');
        // Buscar el usuario por correo
        const queryResult = yield pool.query(`SELECT * FROM usuarios;`);
        if (queryResult.rows.length === 0) {
            return {
                isError: true,
                data: 'Usuario no encontrado'
            };
        }
        const user = queryResult.rows[0];
        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return {
                isError: true,
                data: 'Contraseña incorrecta'
            };
        }
        const token = (0, auth_1.generarToken)(user);
        return {
            isError: false,
            message: token
        };
    }
    catch (error) {
        console.log("ERROR en la autenticación.");
        console.log(error);
        throw error;
    }
});
exports.default = {
    login,
    registerUser,
};
