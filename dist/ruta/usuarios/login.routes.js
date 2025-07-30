"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const login_controller_1 = __importDefault(require("../../controlador/usuarios/login.controller"));
router.post('/login', login_controller_1.default.login);
router.post('/registro', login_controller_1.default.registerUser);
router.get('/permisos', login_controller_1.default.permisos);
router.post('/edit-permisos', login_controller_1.default.editPermisos);
router.delete('/delete-users/:id', login_controller_1.default.deleteUsers);
router.post('/verificar-huella', login_controller_1.default.verificarHuella);
router.post('/capture-huella', login_controller_1.default.captureHuella);
exports.default = router;
