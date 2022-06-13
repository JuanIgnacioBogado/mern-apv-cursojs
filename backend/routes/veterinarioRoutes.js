import { Router } from 'express';

import checkAuth from '../middlewares/authMiddleware.js';
import checkToken from '../middlewares/comprobarToken.js';

import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
} from '../controllers/veterinarioController.js'

const router = Router();

// área publica
router.post('/', registrar);
router.get('/confirmar/:token', checkToken, confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token')
    .get(checkToken, comprobarToken)
    .post(checkToken, nuevoPassword);

// área privada
router.route('/perfil')
    .get(checkAuth, perfil)
    .put(checkAuth, actualizarPerfil);

router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;