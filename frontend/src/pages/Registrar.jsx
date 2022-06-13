import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';

import Alerta from '../components/Alerta';

const Registrar = () => {
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        repetirPassword: ''
    });
    const [alerta, setAlerta] = useState({});

    const { nombre, email, password, repetirPassword } = form;

    const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre.trim(), email.trim(), password.trim(), repetirPassword.trim()].includes('')) {
            setAlerta({ msg: 'Hay campos vacíos', error: true });
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({ msg: 'El password debe ser de 6 o más caracteres', error: true });
            return;
        }

        setAlerta({});

        try {
            await axios.post('/veterinarios', form);
            setAlerta({ msg: 'Usuario creado correctamente, revisa tu email' });
        } catch ({ response }) {
            setAlerta({
                msg: response.data.msg,
                error: true
            });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl mt-10 md:-mt-10">
                    Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <Alerta alerta={alerta} />

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            onChange={handleChange}
                            name="nombre"
                            value={nombre}
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            name="email"
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
                            onChange={handleChange}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-indigo-600"
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input
                            onChange={handleChange}
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
                        Crear Cuenta
                    </button>
                </form>

                <nav className="my-10">
                    <Link
                        className="block text-center text-gray-500 my-5 hover:underline"
                        to="/"
                    >
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar;