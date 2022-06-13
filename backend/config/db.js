import mongoose from 'mongoose';

const { connect, connection, } = mongoose;

(async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log(`DB: ${connection.name} is connected ${connection.host}:${connection.port}`);
    } catch ({message}) {
        console.log(`error: ${message}`);
        process.exit(1);
    }
})();