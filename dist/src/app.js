"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fileUpload = require('express-fileupload');
const app = (0, express_1.default)();
// CORS
const allowedOrigins = [
    'https://valle.parqueaderosantacruz.shop',
    'https://cucuta.parqueaderosantacruz.shop',
    'http://localhost:4200' // solo para pruebas locales
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log('🚫 Bloqueado por CORS:', origin);
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
}));
// Middlewares globales
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(fileUpload());
app.use(body_parser_1.default.json({ limit: '500mb' }));
app.use(body_parser_1.default.urlencoded({ extended: false, limit: '500mb' }));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// 🧠 Middleware de subdominio
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const host = req.headers.host || '';
//   const subdomain = host.split('.')[0];
//   console.log('🛰️ Subdominio detectado:', subdomain);
//   if (subdomain === 'valle' || subdomain === 'cucuta') {
//     (req as any).schema = subdomain;
//     return next();
//   }
//   // Permitimos pruebas locales (curl, localhost)
//   if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
//     (req as any).schema = 'valle'; // por defecto para pruebas
//     return next();
//   }
//   return res.status(400).json({ message: 'Subdominio no válido' });
// });
app.use((req, res, next) => {
    var _a;
    const subdomain = req.headers['x-subdomain'];
    if (subdomain === 'valle' || subdomain === 'cucuta') {
        req.schema = subdomain;
        return next();
    }
    // fallback para localhost
    if ((_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.startsWith('localhost')) {
        req.schema = 'valle';
        return next();
    }
    return res.status(400).json({ message: 'Subdominio no válido' });
});
// Rutas
const login_routes_1 = __importDefault(require("./ruta/usuarios/login.routes"));
const tablero_routes_1 = __importDefault(require("./ruta/tablero/tablero.routes"));
const socio_routes_1 = __importDefault(require("./ruta/socios/socio.routes"));
app.use('/usuarios', login_routes_1.default);
app.use('/tablero', tablero_routes_1.default);
app.use('/socios', socio_routes_1.default);
// 404 handler para rutas que no existen
app.use((req, res, next) => {
    res.status(404);
    next(new Error('Not Found'));
});
// Error handler
app.use(function (err, req, res, next) {
    console.error('❌ Error atrapado:', err.message);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error del servidor',
    });
});
// Angular: enviar index.html en rutas desconocidas solo si no son API
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
exports.default = app;
