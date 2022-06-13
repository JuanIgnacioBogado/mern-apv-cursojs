import { usePacientes } from '../context/PacientesProvider';

const Paciente = ({ paciente }) => {
    const { setPaciente, eliminarPaciente } = usePacientes();
    const {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,
        _id,
    } = paciente;

    const formatearFecha = fecha => new Intl.DateTimeFormat('es-AR', { dateStyle: 'full' }).format(new Date(fecha));

    return (
        <div className="m-5 bg-white shadow-md p-5 rounded-md">
            <p className="text-indigo-700 my-1 font-bold uppercase">
                Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="text-indigo-700 my-1 font-bold uppercase">
                Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="text-indigo-700 my-1 font-bold uppercase">
                Email: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="text-indigo-700 my-1 font-bold uppercase">
                Fecha: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
            </p>
            <p className="text-indigo-700 my-1 font-bold uppercase">
                Síntomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-end items-center my-2 text-white">
                <button
                    onClick={() => setPaciente(paciente)}
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 uppercase rounded-3xl font-bold"
                    >
                    Editar
                </button>
                <button
                    onClick={() => eliminarPaciente(_id)}
                    type="button"
                    className="py-2 px-10 ml-2 bg-red-600 hover:bg-red-700 uppercase rounded-3xl font-bold"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;