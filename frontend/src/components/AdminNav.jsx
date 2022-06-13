import { Link } from 'react-router-dom';

const AdminNav = () => (
    <nav className="flex justify-center md:justify-start gap-3 uppercase font-bold text-gray-500 transition-colors">
        <Link className="hover:text-indigo-600" to="/admin/perfil">Perfil</Link>
        <Link className="hover:text-indigo-600" to="/admin/cambiar-password">Cambiar Password</Link>
    </nav>
);

export default AdminNav;