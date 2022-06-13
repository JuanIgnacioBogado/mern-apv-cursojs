import nodemailer from 'nodemailer';

const {
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_HOST,
    EMAIL_PORT,
    FRONTEND_URL
} = process.env;

const emailRegistro = async ({ email, nombre, token }) => {
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
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `
            <p>Hola: <strong>${nombre}</strong>, comprueba tu cuenta en APV.</p>
            <p>
                Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
                <a href="${FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', messageId);
};

export default emailRegistro;