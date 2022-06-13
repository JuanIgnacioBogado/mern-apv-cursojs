import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

import AdminNav from '../components/AdminNav';
import Alerta from '../components/Alerta';

const CambiarPassword = () => {
    const { guardarPassword } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });
    const { pwd_actual, pwd_nuevo } = password;

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(c => c.trim() === '')) {
            setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true
            });
            return setTimeout(() => setAlerta({}), 3000);
        }
        if (pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El Password debe tener mínimo 6 caracteres',
                error: true
            });
            return setTimeout(() => setAlerta({}), 3000);
        }

        const mensaje = await guardarPassword(password);
        setAlerta(mensaje);
        setPassword({
            pwd_actual: '',
            pwd_nuevo: ''
        });
        setTimeout(() => setAlerta({}), 3000);
    };

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu {''}
                <span className="text-indigo-500 font-bold">Password aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow p-5 mx-4 rounded-lg uppercase font-bold text-gray-600">
                    <Alerta alerta={alerta} />

                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label>Password Actual</label>
                            <input
                                onChange={({ target: { value, name } }) => setPassword({ ...password, [name]: value })}
                                value={pwd_actual}
                                type="password"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="pwd_actual"
                                placeholder="Ingresa tu Password Actual"
                            />
                        </div>
                        <div className="my-5">
                            <label>Password Nueva</label>
                            <input
                                onChange={({ target: { value, name } }) => setPassword({ ...password, [name]: value })}
                                value={pwd_nuevo}
                                type="password"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="pwd_nuevo"
                                placeholder="Ingresa tu Nueva Password"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Actualizar Password"
                            className="w-full rounded-lg text-white bg-indigo-700 hover:bg-indigo-600 cursor-pointer py-2 uppercase font-bold transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;