"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const socios_controller_1 = __importDefault(require("../../controlador/socios/socios.controller"));
router.post('/updatesocios', socios_controller_1.default.updateSocios);
router.post('/update-socios', socios_controller_1.default.updateSocio);
router.get('/getsocios', socios_controller_1.default.getsocios);
exports.default = router;
