import Formulario from '../components/Formulario';
import ListadoPacientes from '../components/ListadoPacientes';

const AdministrarPacientes = () => (
    <div className="flex flex-col md:flex-row">
        <Formulario />

        <ListadoPacientes />
    </div>
);

export default AdministrarPacientes;