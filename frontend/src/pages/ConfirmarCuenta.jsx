import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../config/axios';

import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
    const { id } = useParams();
    const [cargando, setCargando] = useState(true);
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data: { msg } } = await axios(url);
                setCuentaConfirmada(true);
                setAlerta({ msg });
            } catch ({ response }) {
                setAlerta({
                    msg: response.data.msg,
                    error: true
                });
            }
            setCargando(false);
        })();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl mt-10 md:-mt-10">
                    Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link className="block text-center text-gray-500 my-5 hover:underline" to="/">
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </>
    )
};

export default ConfirmarCuenta;