import dotenv from "dotenv";
dotenv.config();

const config = {
    amqp: process.env.AMQP_URL,
    jwt: {
        header: {
            algorithm: process.env.JWT_ALGORITHM,
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_EXPIRES,
            subject: process.env.JWT_SUBJECT,
        },
        secret: process.env.JWT_PRIVATE_KEY,
    },
};

export default config;
