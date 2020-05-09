const neo4j = require("neo4j-driver");
const keys = require("./../environment/keys/keys.js");

const waitForDriverInit = async function(){
    await setTimeout(() => {}, 1000);
};

const loggingConfig = { logging: neo4j.logging.console('error') };

const driver = neo4j.driver(
    `${keys.NEO4J_PROTOCOL}://${keys.NEO4J_HOST}:${keys.NEO4J_PORT}`,
    neo4j.auth.basic(`${keys.NEO4J_USERNAME}`, `${keys.NEO4J_PASSWORD}`),
    loggingConfig
);

driver.verifyConnectivity()
    .then(serverInfo => {
        if (serverInfo.address && serverInfo.version) {
            console.log(`Driver created successfully at ${serverInfo.address}`);
        }
    })
    .catch(error => {
        console.log(error);
    });

waitForDriverInit().catch(error => console.log(error));

module.exports = driver;