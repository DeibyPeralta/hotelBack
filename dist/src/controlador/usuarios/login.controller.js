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
const login_service_1 = __importDefault(require("../../servicio/usuarios/login.service"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const correo = req.body.correo;
        const password = req.body.password;
        const responde = yield login_service_1.default.login(correo, password);
        return res.status(200).json(responde.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const correo = req.body.email;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const cedula = req.body.cedula;
        const telefono = req.body.telefono;
        const rol = req.body.rol;
        const responde = yield login_service_1.default.registerUser(correo, password, nombre, cedula, telefono, rol);
        return res.status(200).json(responde.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
exports.default = {
    login,
    registerUser,
};
