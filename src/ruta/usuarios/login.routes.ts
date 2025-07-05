import express from "express";
const router = express.Router();
import loginController from '../../controlador/usuarios/login.controller';

router.post('/login', loginController.login)
router.post('/registro', loginController.registerUser)
router.get('/permisos', loginController.permisos)
router.post('/edit-permisos', loginController.editPermisos)
router.delete('/delete-users/:id', loginController.deleteUsers)
// router.get('/captureFingerprint', loginController.captureFingerprint);


export default router;