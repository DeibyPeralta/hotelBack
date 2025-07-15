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
const socios_service_1 = __importDefault(require("../../servicio/socios/socios.service"));
const xlsx_1 = __importDefault(require("xlsx"));
const updateSocios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const files = req.files;
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: 'No se ha seleccionado ningún archivo para subir.' });
        }
        const file = files.file;
        const workbook = xlsx_1.default.read(file.data, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];
        const data = xlsx_1.default.utils.sheet_to_json(sheet);
        const response = yield socios_service_1.default.updateSocios(data, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const getsocios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield socios_service_1.default.getsocios(schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
const updateSocio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = req.schema;
        const response = yield socios_service_1.default.updateSocio(req.body, schema);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log("ERROR ");
        console.log(error);
        throw error;
    }
});
exports.default = {
    updateSocios,
    getsocios,
    updateSocio
};
