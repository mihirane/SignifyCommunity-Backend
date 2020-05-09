const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const sentFriendRequestRelationshipQueries = require("./../../../../src/cypher-queries/relationships/SentFriendRequestRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/SentFriendRequestRelationshipQueries/createSentFriendRequestRelationshipBetweenUsers");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/SentFriendRequestRelationshipQueries/createSentFriendRequestRelationshipBetweenUsers";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing create sent friend request relationship between users query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("create sent friend request relationship between users query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
                dummySentFriendRequestRelationshipsData
            }) => {
                for (let i = await 0; i <= dummyUsersData.length - 1; i++) {
                    for (let j = await (i + 1); j <= dummyUsersData.length - 1; j++) {
                        await executeQuery(sentFriendRequestRelationshipQueries.createSentFriendRequestRelationshipBetweenUsers.query, sentFriendRequestRelationshipQueries.createSentFriendRequestRelationshipBetweenUsers.params(dummyUsersData[i].recentFacebookAccessToken, dummyUsersData[j].id))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                await assert(records[1] instanceof Object, "records[1] is an object");
                                await assert(records[2] instanceof Object, "records[2] is an object");

                                const startNodeTestObject = await createTestObject(records[1], ["User", "ID"]);
                                const endNodeTestObject = await createTestObject(records[2], ["User", "ID"]);

                                await assert(startNodeTestObject.id == dummyUsersData[i].id, "Start node id matches");
                                await assert(endNodeTestObject.id == dummyUsersData[j].id, "End node id matches");
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    });

});