import { request, response } from 'express';
import mongoose from 'mongoose';

const comprobarMongoId = (req = request, res = response, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ msg: 'El ID no es Válido' });
    next();
};

export default comprobarMongoId;