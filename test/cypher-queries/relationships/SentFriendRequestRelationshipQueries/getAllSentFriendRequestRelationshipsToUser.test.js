const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const sentFriendRequestRelationshipQueries = require("./../../../../src/cypher-queries/relationships/SentFriendRequestRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/SentFriendRequestRelationshipQueries/getAllSentFriendRequestRelationshipsToUser");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/SentFriendRequestRelationshipQueries/getAllSentFriendRequestRelationshipsByUser";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all sent friend request relationships to user query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all sent friend request relationships to user query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsToUser.query, sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsToUser.params(dummyUsersData[i].recentFacebookAccessToken))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["User", "ID"]);
                            const dummyUsersTestObject = await createTestObject(dummyUser.receivedFriendRequests, ["User", "ID"]);
                            await assert.deepStrictEqual(recordsTestObject, dummyUsersTestObject);
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