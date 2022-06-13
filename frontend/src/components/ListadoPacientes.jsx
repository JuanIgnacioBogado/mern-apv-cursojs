import { useEffect } from 'react';
import { usePacientes } from '../context/PacientesProvider';
import axios, { configHeaders } from '../config/axios';

import Paciente from './Paciente';

const ListadoPacientes = () => {
    const { pacientes, setPacientes } = usePacientes();

    useEffect(() => {
        if (!pacientes.length) {
            (async () => {
                try {
                    const { data } = await axios('/pacientes', configHeaders());
                    setPacientes(data);
                } catch ({ response }) {
                    console.error(response.data.msg);
                }
            })();
        }
    }, []);

    return (
        <div className="md:w-1/2 lg:w-3/5">
            {!pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-center text-xl mt-5">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-center text-xl mt-5">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>

                    {pacientes.map(paciente => (
                        <Paciente
                            key={paciente._id}
                            paciente={paciente}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ListadoPacientes;