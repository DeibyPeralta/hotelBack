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
exports.resolveEmpresa = resolveEmpresa;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const pool = dbConfig_1.default.pool;
function resolveEmpresa(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const subdominio = (_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        if (!subdominio)
            return res.status(400).send('Subdominio no encontrado');
        const result = yield pool.query('SELECT id, esquema FROM empresas WHERE esquema = $1', [subdominio]);
        if (result.rowCount === 0) {
            return res.status(404).send('Empresa no encontrada');
        }
        req.empresa = {
            id: result.rows[0].id,
            esquema: result.rows[0].esquema
        };
        next();
    });
}
