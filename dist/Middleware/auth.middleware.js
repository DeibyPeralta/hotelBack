"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarMiddleware = void 0;
const auth_1 = require("../config/auth");
function autenticarMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ mensaje: 'Token no proporcionado' });
        return;
    }
    try {
        const usuario = (0, auth_1.verificarToken)(token);
        req.usuario = usuario;
        next();
    }
    catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
}
exports.autenticarMiddleware = autenticarMiddleware;
