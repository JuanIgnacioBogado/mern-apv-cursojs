import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;

const clienteAxios = axios.create({
    baseURL: `${VITE_BACKEND_URL}/api`
});

export const configHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export default clienteAxios;