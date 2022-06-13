import { useEffect, useState } from 'react';
import { usePacientes } from '../context/PacientesProvider';

import Alerta from '../components/Alerta';

const Formulario = () => {
    const { guardarPaciente, actualizarPaciente, paciente } = usePacientes();
    const [showForm, setShowForm] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [form, setForm] = useState({
        nombre: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });
    const { nombre, propietario, email, fecha, sintomas } = form;

    const handleChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(form).some(campo => campo.trim() === '')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return setTimeout(() => setAlerta({}), 3000);
        }

        if (paciente._id) {
            await actualizarPaciente(form);
            setAlerta({ msg: 'Paciente actualizado correctamente' });
        } else {
            await guardarPaciente(form);
            setAlerta({ msg: 'Paciente guardado correctamente' });
        }
        setForm({
            nombre: '',
            propietario: '',
            email: '',
            fecha: '',
            sintomas: ''
        });
        setTimeout(() => setAlerta({}), 3000);
    };

    useEffect(() => {
        if (paciente._id) {
            setForm(paciente);
        }
    }, [paciente]);

    return (
        <>
            <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors p-3 text-white uppercase font-bold md:hidden mx-2 mb-5"
            >
                {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>

            <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
                <p className="text-xl text-center my-5">
                    Añade tus pacientes y {''}
                    <span className="text-indigo-600 font-bold">Adminístralos</span>
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white py-10 px-5 shadow-md rounded-md m-4"
                >
                    <Alerta alerta={alerta} />

                    <div className="mb-5">
                        <label
                            htmlFor="nombre"
                            className="text-gray-700 uppercase font-bold"
                        >Nombre Mascota</label>
                        <input
                            onChange={handleChange}
                            value={nombre}
                            name="nombre"
                            id="nombre"
                            type="text"
                            placeholder="Nombre de la Mascota"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-600"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="propietario"
                            className="text-gray-700 uppercase font-bold"
                        >Nombre Propietario</label>
                        <input
                            onChange={handleChange}
                            value={propietario}
                            name="propietario"
                            id="propietario"
                            type="text"
                            placeholder="Nombre del Propietario"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-600"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="text-gray-700 uppercase font-bold"
                        >Email Propietario</label>
                        <input
                            onChange={handleChange}
                            value={email}
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email del Propietario"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-600"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="fecha"
                            className="text-gray-700 uppercase font-bold"
                        >Fecha Alta</label>
                        <input
                            onChange={handleChange}
                            value={fecha}
                            name="fecha"
                            id="fecha"
                            type="date"
                            className="border-2 w-full p-2 mt-2 rounded-md focus:outline-indigo-600"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="sintomas"
                            className="text-gray-700 uppercase font-bold"
                        >Síntomas</label>
                        <textarea
                            onChange={handleChange}
                            value={sintomas}
                            name="sintomas"
                            id="sintomas"
                            placeholder="Describe los Síntomas"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-600 resize-none"
                        />
                    </div>

                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer w-full p-3 text-white uppercase font-bold"
                        value={paciente._id ? 'Editar Paciente' : 'Agregar Paciente'}
                    />
                </form>
            </div>
        </>
    );
};

export default Formulario;