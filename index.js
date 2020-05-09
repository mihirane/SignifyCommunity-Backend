const express = require('express');
const driver = require("./src/neo4j-driver/neo4jDriver.js");
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { ApolloServer, makeExecutableSchema, AuthenticationError } = require("apollo-server-express");
const typeDefs = require("./src/graphql/typeDefs.js");
const resolvers = require("./src/graphql/resolvers.js");
const { facebookAuthProtectRouteWithAppSecretProof } = require("./src/facebook-auth/facebookAuthMiddlewareFunctions.js");
const keys = require("./src/environment/keys/keys.js");
const clientSecret = keys.FACEBOOK_CLIENT_SECRET;

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(facebookAuthProtectRouteWithAppSecretProof(clientSecret));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new ApolloServer({
    context: { driver },
    schema: schema,
    playground: (process.env.NODE_ENV == 'development'),
    context: ({ req }) => {
        if (!req.cookies.access_token || !req.cookies.facebook_id || !req.headers.app_secret_proof) {
            throw new AuthenticationError('Unautherised Request');
        }

        return req.cookies;
    }
});

server.applyMiddleware({
    cors: true,
    app: app,
    path: '/graphql'
});

const host = keys.HOST;
const port = keys.PORT;

const expressServer = app.listen(port, () =>
    console.log(`Server running at ${host}:${port}`)
);

module.exports = {
    app: app,
    server: expressServer
};