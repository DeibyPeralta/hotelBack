"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'tu_secreto_secreto';
function generarToken(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora
}
exports.generarToken = generarToken;
function verificarToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new Error('Token inválido');
    }
}
exports.verificarToken = verificarToken;
