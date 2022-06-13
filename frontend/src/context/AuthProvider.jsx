import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { configHeaders } from '../config/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/', {
            state: () => {
                setAuth({});
                setCargando(true);
            }
        });
    };

    const actualizarPerfil = async datos => {
        try {
            const { data } = await axios.put('/veterinarios/perfil', datos, configHeaders());
            setAuth(data);
            return { msg: 'Perfil actualizado correctamente' };
        } catch ({ response }) {
            return {
                msg: response.data.msg,
                error: true
            };
        }
    };

    const guardarPassword = async datos => {
        try {
            const { data } = await axios.put('/veterinarios/actualizar-password', datos, configHeaders());
            return data;
        } catch ({ response }) {
            return {
                msg: response.data.msg,
                error: true
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                setAuth,
                setCargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;