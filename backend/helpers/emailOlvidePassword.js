import nodemailer from 'nodemailer';

const {
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_HOST,
    EMAIL_PORT,
    FRONTEND_URL
} = process.env;

const emailOlvidePassword = async ({ email, nombre, token }) => {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const { messageId } = await transporter.sendMail({
        from: 'APV - Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Restablece tu Password - APV',
        text: 'Restablece tu Password - APV',
        html: `
            <p>Hola: <strong>${nombre}</strong>, has solicitado restablecer tu password.</p>
            <p>
                Para restablecer tu password dirígete al siguiente enlace:
                <a href="${FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
            </p>
            <p>Si tu no solicitaste el recupero de password, ignora este mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', messageId);
};

export default emailOlvidePassword;