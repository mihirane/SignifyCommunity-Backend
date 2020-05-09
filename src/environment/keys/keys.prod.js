require('dotenv').config({
    path: __dirname + '/../.env'
});

module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    NEO4J_PROTOCOL: process.env.NEO4J_PROTOCOL,
    NEO4J_HOST: process.env.NEO4J_HOST,
    NEO4J_PORT: process.env.NEO4J_PORT,
    NEO4J_USERNAME: process.env.NEO4J_USERNAME,
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET
};