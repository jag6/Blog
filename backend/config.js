import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    ADMIN_PW: process.env.ADMIN_PW,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};
