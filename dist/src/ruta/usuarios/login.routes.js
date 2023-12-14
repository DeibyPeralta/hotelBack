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
// router.get('/captureFingerprint', loginController.captureFingerprint);
exports.default = router;
