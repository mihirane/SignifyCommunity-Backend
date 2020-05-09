const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const postQueries = require("./../../../../src/cypher-queries/nodes/PostQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/PostQueries/tagUsersToPost");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/PostQueries/tagUsersToPost";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing tag users to post query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("tag users to post query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyPostsData, async function (dummyPost, i) {
                    await _.forEach(dummyUsersData, async function (dummyUser, j) {
                        await executeQuery(postQueries.tagUsersToPost.query, postQueries.tagUsersToPost.params(dummyPost.id, [dummyUser.id]))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                const recordsTestObject = await createTestObject(records[0], ["User", "ID"]);
                                const dummyUserTestObject = await createTestObject(dummyUser, ["User", "ID"]);
                                await assert.deepStrictEqual(recordsTestObject, dummyUserTestObject);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

});