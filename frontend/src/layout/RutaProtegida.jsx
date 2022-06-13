import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios, { configHeaders } from '../config/axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

const RutaProtegida = () => {
    const { auth, cargando, setAuth, setCargando } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/');
        (async () => {
            try {
                const { data } = await axios('/veterinarios/perfil', configHeaders());
                setAuth(data);
            } catch ({ response }) {
                console.error(response.data.msg);
                setAuth({});
            }
            setCargando(false);
        })();
    }, []);

    if (cargando) return 'Cargando...';

    return (
        <>
            <Header />

            {auth?._id && (
                <main className="container mx-auto mt-5">
                    <Outlet />
                </main>
            )}

            <Footer />
        </>
    )
};

export default RutaProtegida; 