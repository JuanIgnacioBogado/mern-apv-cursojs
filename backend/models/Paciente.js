import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const pacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        required: true
    },
    veterinario: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinario'
    }
}, {
    timestamps: true
});

export default model('Paciente', pacienteSchema);