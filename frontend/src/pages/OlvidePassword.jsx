import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';

import Alerta from '../components/Alerta';

const OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!email.trim()) return setAlerta({ msg: 'El email es obligatorio', error: true });
        setAlerta({});

        try {
            const { data: { msg } } = await axios.post('/veterinarios/olvide-password', { email });
            setAlerta({ msg });
        } catch ({ response }) {
            setAlerta({ msg: response.data.msg, error: true });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl mt-10 md:-mt-10">
                    Recupera tu Acceso y no pierdas <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <Alerta alerta={alerta} />

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            onChange={({ target: { value } }) => setEmail(value)}
                            value={email}
                            name="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 hover:bg-indigo-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 md:w-auto"
                    >
                        Enviar Instrucciones
                    </button>
                </form>

                <nav className="my-10 xl:flex xl:justify-between">
                    <Link
                        className="block text-center text-gray-500 my-5 hover:underline"
                        to="/"
                    >
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                    <Link
                        className="block text-center text-gray-500 my-5 hover:underline"
                        to="/registrar"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword;