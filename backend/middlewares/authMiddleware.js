import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req = request, res = response, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(id).select('-password -token -confirmado -__v');
            return next();
        } catch (error) {
            return res.status(403).json({ msg: 'Token no válido' });
        }
    }

    if (!token) {
        return res.status(403).json({ msg: 'Token no válido o inexistente' });
    }
    next();
};

export default checkAuth;