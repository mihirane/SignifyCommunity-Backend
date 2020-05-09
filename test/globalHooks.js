const driver = require("../src/neo4j-driver/neo4jDriver.js");
const { server } = require("../index.js");

after(async () => {
    await driver.session().close();
    await driver.rxSession().close();
    await driver.close();
    await server.close();
});