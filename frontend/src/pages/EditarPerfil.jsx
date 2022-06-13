import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

import AdminNav from '../components/AdminNav';
import Alerta from '../components/Alerta';

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [perfil, setPerfil] = useState({
        nombre: '',
        email: '',
        web: '',
        telefono: ''
    });
    const { nombre, email, web, telefono } = perfil;

    const handleChange = ({ target: { value, name } }) => setPerfil({ ...perfil, [name]: value });

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), email.trim()].includes('')) {
            setAlerta({
                msg: 'El Nombre y el Email son obligatorios',
                error: true
            });
            return setTimeout(() => setAlerta({}), 3000);
        }

        const mensaje = await actualizarPerfil({
            ...perfil,
            telefono: telefono.trim(),
            web: web.trim()
        });
        setAlerta(mensaje);
        setTimeout(() => setAlerta({}), 3000);
    };

    useEffect(() => {
        setPerfil(auth);
    }, []);

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu {''}
                <span className="text-indigo-500 font-bold">Información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow p-5 mx-4 rounded-lg uppercase font-bold text-gray-600">
                    <Alerta alerta={alerta} />

                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label>Nombre</label>
                            <input
                                onChange={handleChange}
                                value={nombre}
                                type="text"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="nombre"
                            />
                        </div>
                        <div className="my-5">
                            <label>Sitio Web</label>
                            <input
                                onChange={handleChange}
                                value={web || ''}
                                type="text"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="web"
                            />
                        </div>
                        <div className="my-5">
                            <label>Teléfono</label>
                            <input
                                onChange={handleChange}
                                value={telefono || ''}
                                type="text"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="telefono"
                            />
                        </div>
                        <div className="my-5">
                            <label>Email</label>
                            <input
                                onChange={handleChange}
                                value={email}
                                type="email"
                                className="w-full border rounded-lg p-2 mt-2 bg-gray-50 focus:outline-indigo-600"
                                name="email"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="w-full rounded-lg text-white bg-indigo-700 hover:bg-indigo-600 cursor-pointer py-2 uppercase font-bold transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;