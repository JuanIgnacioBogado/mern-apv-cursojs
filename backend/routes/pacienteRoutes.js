import { Router } from 'express';

import checkAuth from '../middlewares/authMiddleware.js';
import comprobarMongoId from '../middlewares/comprobarMongoId.js';

import {
    obtenerPacientes,
    agregarPacientes,
    obtenerPaciente,
    actualizarPaciente,
    borrarPaciente
} from '../controllers/pacienteController.js';

const router = Router();

router.route('/')
    .get(checkAuth, obtenerPacientes)
    .post(checkAuth, agregarPacientes);

router.route('/:id')
    .get(checkAuth, comprobarMongoId, obtenerPaciente)
    .put(checkAuth, comprobarMongoId, actualizarPaciente)
    .delete(checkAuth, comprobarMongoId, borrarPaciente);

export default router;