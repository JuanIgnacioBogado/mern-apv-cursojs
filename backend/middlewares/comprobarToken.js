import { request, response } from 'express';

import Veterinario from '../models/Veterinario.js';

const checkToken = async (req = request, res = response, next) => {
    try {
        const { token } = req.params;
        const user = await Veterinario.findOne({ token });
        if (!user) throw new Error('Token no válido');
        req.veterinario = user;
        return next();
    } catch ({message}) {
        console.log(message);
        return res.status(403).json({ msg: message });
    }
};

export default checkToken;