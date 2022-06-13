import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const { FRONTEND_URL } = process.env;

const dominiosPermitidos = [FRONTEND_URL];

const app = express();

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log('Server on port', PORT));