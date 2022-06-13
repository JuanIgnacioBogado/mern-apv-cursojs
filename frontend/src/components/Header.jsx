import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Header = () => {
    const { cerrarSesion } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {' '}
                    <span className="text-white font-black">Veterinaria</span>
                </h1>

                <nav className="flex flex-col lg:flex-row items-center mt-5 lg:mt-0 gap-4 text-white uppercase font-bold text-sm">
                    <Link to="/admin">Pacientes</Link>
                    <Link to="/admin/perfil">Perfil</Link>

                    <button
                        onClick={cerrarSesion}
                        type="button"
                        className="uppercase font-bold"
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;