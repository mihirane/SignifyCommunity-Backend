const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const seenRelationshipQueries = require("./../../../../src/cypher-queries/relationships/SeenRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/SeenRelationshipQueries/getAllSeenComments");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/SeenRelationshipQueries/getAllSeenComments";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all seen comments query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all seen comments query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(seenRelationshipQueries.getAllSeenComments.query, seenRelationshipQueries.getAllSeenComments.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");

                            const seenCommentsTestObject = await createTestObject(records, ["Comment", "ID"]);
                            const expectedSeenCommentsTestObject = await createTestObject(dummyUser.seenComments, ["Comment", "ID"]);

                            await assert.deepStrictEqual(seenCommentsTestObject, expectedSeenCommentsTestObject);
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