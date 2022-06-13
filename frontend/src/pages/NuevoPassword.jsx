import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../config/axios';

import Alerta from '../components/Alerta';

const nuevoPassword = () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [cargando, setCargando] = useState(true);
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([password.trim(), repetirPassword.trim()].includes('')) return setAlerta({ msg: 'Ambos campos son obligatorios', error: true });
        if (password !== repetirPassword) return setAlerta({ msg: 'Los passwords no son iguales', error: true });
        if (password.length < 6) return setAlerta({ msg: 'El password debe ser de 6 o más caracteres', error: true });
        setAlerta({});

        try {
            const { data: { msg } } = await axios.post(`/veterinarios/olvide-password/${id}`, { password });
            setAlerta({ msg });
            setPasswordModificado(true);
        } catch ({ response }) {
            setAlerta({ msg: response.data.msg, error: true });
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await axios(`/veterinarios/olvide-password/${id}`);
                setTokenValido(true);
                setAlerta({ msg: 'Coloca tu Nuevo Password' });
            } catch ({ response }) {
                setAlerta({ msg: response.data.msg, error: true });
            }
            setCargando(false);
        })();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl mt-10 md:-mt-10">
                    Recupera tu Password y no Pierdas Acceso a <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando && <Alerta alerta={alerta} />}

                {tokenValido && (
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Nuevo Password
                            </label>
                            <input
                                onChange={({ target: { value } }) => setPassword(value)}
                                name="password"
                                value={password}
                                type="password"
                                placeholder="Tu Nuevo Password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Repetir Password
                            </label>
                            <input
                                onChange={({ target: { value } }) => setRepetirPassword(value)}
                                name="repetirPassword"
                                value={repetirPassword}
                                type="password"
                                placeholder="Repite tu Password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-700 hover:bg-indigo-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 md:w-auto"
                        >
                            Guardar Nuevo Password
                        </button>
                    </form>
                )}
                {passwordModificado && (
                    <Link className="block text-center text-gray-500 mb-5 mt-10 hover:underline" to="/">
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </>
    )
};

export default nuevoPassword;