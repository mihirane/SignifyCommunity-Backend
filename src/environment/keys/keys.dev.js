require('dotenv').config({
    path: __dirname + '/../.env'
});

module.exports = {
    HOST: process.env.DUMMY_HOST,
    PORT: process.env.DUMMY_PORT,
    NEO4J_PROTOCOL: process.env.DUMMY_NEO4J_PROTOCOL,
    NEO4J_HOST: process.env.DUMMY_NEO4J_HOST,
    NEO4J_PORT: process.env.DUMMY_NEO4J_PORT,
    NEO4J_USERNAME: process.env.DUMMY_NEO4J_USERNAME,
    NEO4J_PASSWORD: process.env.DUMMY_NEO4J_PASSWORD,
    FACEBOOK_CLIENT_ID: process.env.DUMMY_FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.DUMMY_FACEBOOK_CLIENT_SECRET
};