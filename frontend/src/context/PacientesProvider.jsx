import { useState, useContext, createContext } from 'react';
import axios, { configHeaders } from '../config/axios';

const PacientesContext = createContext();

export const usePacientes = () => useContext(PacientesContext);

const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const guardarPaciente = async paciente => {
        try {
            const { data } = await axios.post('/pacientes', paciente, configHeaders());
            setPacientes([...pacientes, data]);
        } catch ({ response }) {
            console.error(response.data.msg);
        }
    };

    const actualizarPaciente = async paciente => {
        try {
            const { data } = await axios.put(`/pacientes/${paciente._id}`, paciente, configHeaders());
            setPaciente({});
            const pacientesActualizados = pacientes.map(p => p._id === data._id ? data : p);
            setPacientes(pacientesActualizados);
        } catch ({ response }) {
            console.error(response.data.msg);
        }
    };

    const eliminarPaciente = async id => {
        const res = confirm('¿Estás seguro de eliminar este paciente?');
        if (res) {
            try {
                const { data } = await axios.delete(`/pacientes/${id}`, configHeaders());
                const pacientesFiltrados = pacientes.filter(p => p._id !== data._id);
                setPacientes(pacientesFiltrados);
            } catch ({ response }) {
                console.error(response.data.msg);
            }
        }
    };

    return (
        <PacientesContext.Provider
            value={{
                paciente,
                pacientes,
                setPaciente,
                setPacientes,
                guardarPaciente,
                actualizarPaciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

export default PacientesProvider;