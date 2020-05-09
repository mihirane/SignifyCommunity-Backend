const driver = require("./../../src/neo4j-driver/neo4jDriver.js");
const _ = require("lodash");

module.exports = async function (query, params) {

    const session = await driver.session();
    const tx = await session.beginTransaction();
    const resultOutput = await [];

    await tx.run(query, params)
        .then(async (result) => {
            await tx.commit();

            if (result.records == []) {
                return null;
            }

            await _.forEach(result.records, async function (record, i) {
                if (record && record != null) {
                    await _.forEach(record._fields, async function (field, j) {
                        if (field && field != null && field.properties != null) {

                            await _.forEach(record.properties, async function (property, k) {
                                if (neo4j.isInt(property)) {
                                    property = await property.toNumber();
                                }

                                if (neo4j.isDateTime(property)) {
                                    property = await property.toString();
                                }
                            });

                            await resultOutput.push(field.properties);

                        } else {
                            await resultOutput.push(null);
                        }
                    });
                } else {
                    await resultOutput.push(null);
                }
            });

        })
        .catch(async (error) => {
            console.log("Error :");
            console.log(error);
            await tx.rollback();
        })
        .finally(async () => {
            await session.close();
        });

    return resultOutput;
};