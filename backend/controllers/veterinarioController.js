import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

const registrar = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await Veterinario.findOne({ email });
        if (userExist) return res.status(400).json({ msg: `El usuario con el email: ${email} ya está registrado` });

        const user = new Veterinario(req.body);
        const userSaved = await user.save();

        emailRegistro(userSaved);

        res.json(userSaved);
    } catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
};

const perfil = async ({ veterinario }, res) => res.json(veterinario);

const confirmar = async (req, res) => {
    try {
        const user = req.veterinario;
        user.token = null;
        user.confirmado = true;
        await user.save();
        res.json({ msg: 'Usuario Confirmado' });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Veterinario.findOne({ email });
        if (!user) throw new Error(`No existe usuario registrado con el email: ${email}`);
        if (!user.confirmado) throw new Error('Tu cuenta no ha sido confirmada');
        if (!await user.comprobarPassword(password)) throw new Error('La contraseña ingresada es incorrecta');

        res.json({ token: generarJWT(user._id) });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

const olvidePassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Veterinario.findOne({ email });
        if (!user) throw new Error(`El Usuario no existe con el email: ${email}`);
        user.token = generarId();
        await user.save();

        emailOlvidePassword(user);
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

const comprobarToken = async (req, res) => res.json({ msg: 'Token Válido y el usuario existe' });

const nuevoPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { veterinario } = req;
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: 'Password verificado correctamente' });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

const actualizarPerfil = async (req, res) => {
    try {
        if (req.veterinario.email !== req.body.email) {
            const email = await Veterinario.findOne({ email: req.body.email });
            if (email) throw new Error(`El email: ${req.body.email} ya está en uso`);
        }

        const {
            _id,
            telefono,
            web,
            ...resto
        } = req.body;

        const perfil = {
            ...resto,
            telefono: telefono || null,
            web: web || null
        }

        const veterinario = await Veterinario
            .findByIdAndUpdate(_id, perfil, { new: true })
            .select('-password -token -confirmado -__v');

        res.json(veterinario);
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

const actualizarPassword = async (req, res) => {
    try {
        const { pwd_actual, pwd_nuevo } = req.body;
        const veterinario = await Veterinario.findById(req.veterinario._id);

        if (!veterinario) throw new Error('El veterinario no existe');
        if (!await veterinario.comprobarPassword(pwd_actual)) throw new Error('La contraseña ingresada es incorrecta');

        veterinario.password = pwd_nuevo;
        await veterinario.save();
        res.json({ msg: 'Password actualizada correctamente' });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ msg: message });
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
};