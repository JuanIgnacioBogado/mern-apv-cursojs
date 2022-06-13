import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';

import Alerta from '../components/Alerta';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email.trim(), password.trim()].includes('')) {
            return setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true
            });
        }
        setAlerta({});

        try {
            const { data: { token } } = await axios.post('/veterinarios/login', { email, password });
            localStorage.setItem('token', token);
            navigate('/admin');
        } catch ({ response }) {
            setAlerta({
                msg: response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl mt-10 md:-mt-10">
                    Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
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
                            name='email'
                            value={email}
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            onChange={({ target: { value } }) => setPassword(value)}
                            name='password'
                            value={password}
                            type="password"
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 hover:bg-indigo-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 md:w-auto"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <nav className="my-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center text-gray-500 my-5 hover:underline"
                        to="/registrar"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                    <Link
                        className="block text-center text-gray-500 my-5 hover:underline"
                        to="/olvide-password"
                    >
                        Olvide mi Password
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Login;