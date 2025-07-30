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
        const schema = req.schema;
        const correo = req.body.correo;
        const password = req.body.password;
        const response = yield login_service_1.default.login(correo, password, schema);
        if (response.isError == true) {
            return res.status(200).json(response);
        }
        return res.status(200).json(response);
    }
    catch (error) {
        throw error;
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const correo = req.body.correo;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const cedula = req.body.cedula;
        const telefono = req.body.telefono;
        const responde = yield login_service_1.default.registerUser(correo, password, nombre, cedula, telefono, schema);
        return res.status(200).json(responde.message);
    }
    catch (error) {
        throw error;
    }
});
const permisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const responde = yield login_service_1.default.permisos(schema);
        return res.status(200).json(responde);
    }
    catch (error) {
        throw error;
    }
});
const editPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const correo = req.body.correo;
        const rol = req.body.rol;
        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const id = req.body.id;
        const password = req.body.password;
        const responde = yield login_service_1.default.editPermisos(correo, nombre, telefono, rol, id, password, schema);
        return res.status(200).json(responde);
    }
    catch (error) {
        throw error;
    }
});
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const { id } = req.params;
        const responde = yield login_service_1.default.deleteUsers(id, schema);
        return res.status(200).json(responde);
    }
    catch (error) {
        throw error;
    }
});
const verificarHuella = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const { huella_base64 } = req.body;
        if (!huella_base64)
            return res.status(400).json({ error: "Huella base64 es requerida" });
        const persona = yield login_service_1.default.verificarHuella(huella_base64, schema);
        if (persona) {
            res.status(200).json({ encontrado: true, datos: persona });
        }
        else {
            res.status(404).json({ encontrado: false, mensaje: "Huella no encontrada" });
        }
    }
    catch (error) {
        throw error;
    }
});
const captureHuella = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cedula: req.body.cedula,
            telefono: req.body.telefono,
            huella_base64: req.body.huella,
        };
        yield login_service_1.default.captureHuella(usuario, schema);
        return res.status(201).json({ mensaje: "Usuario registrado con éxito" });
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    login,
    registerUser,
    permisos,
    editPermisos,
    deleteUsers,
    verificarHuella,
    captureHuella
};
