import Paciente from '../models/Paciente.js';

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find()
            .where('veterinario')
            .equals(req.veterinario);
        res.json(pacientes);
    } catch ({ message }) {
        res.status(400).json({ msg: message });
    }
};

const agregarPacientes = async (req, res) => {
    try {
        const { _id } = req.veterinario;
        let paciente = new Paciente(req.body);
        paciente.veterinario = _id;
        paciente = await paciente.save();
        res.json(paciente);
    } catch ({ message }) {
        res.status(400).json({ msg: message });
    }
};

const obtenerPaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findById(pacienteId)
            .where('veterinario')
            .equals(req.veterinario);
        
        if (!paciente) return res.status(404).json({msg: 'El paciente no existe'});
        res.json(paciente);
    } catch ({ message }) {
        res.status(400).json({ msg: message });
    }
};

const actualizarPaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findByIdAndUpdate(pacienteId, req.body, { new: true })
            .where('veterinario')
            .equals(req.veterinario);

        if (!paciente) return res.status(404).json({msg: 'El paciente no existe'});
        res.json(paciente);
    } catch ({ message }) {
        res.status(400).json({ msg: message });
    }
};

const borrarPaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findByIdAndDelete(pacienteId, { new: true })
            .where('veterinario')
            .equals(req.veterinario);

        if (!paciente) return res.status(404).json({msg: 'El paciente no existe'});
        res.json(paciente);
    } catch ({ message }) {
        res.status(400).json({ msg: message });
    }
};

export {
    obtenerPacientes,
    agregarPacientes,
    obtenerPaciente,
    actualizarPaciente,
    borrarPaciente
};