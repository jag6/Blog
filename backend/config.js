const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    ADMIN_FN: process.env.ADMIN_FN,
    ADMIN_LN: process.env.ADMIN_LN,
    ADMIN_E: process.env.ADMIN_E,
    ADMIN_PW: process.env.ADMIN_PW,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};