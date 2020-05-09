const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const userQueries = require("./../../../../src/cypher-queries/nodes/UserQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/UserQueries/getAllUsersExceptMe");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/UserQueries/getAllUsersExceptMe";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all users except me query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all users except me query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(userQueries.getAllUsersExceptMe.query, userQueries.getAllUsersExceptMe.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["User", "UserHidden"]);
                            const dummyUsersTestObject = await createTestObject(dummyUsersData, ["User", "UserHidden"]);

                            const dummyUsersFilteredtestObject = await [];

                            await _.forEach(dummyUsersTestObject, async function (dummyUserTestObject, j) {
                                if(dummyUserTestObject.id != dummyUser.id){
                                    await dummyUsersFilteredtestObject.push(dummyUserTestObject);
                                }
                            });

                            await assert.deepStrictEqual(recordsTestObject, dummyUsersFilteredtestObject);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

});