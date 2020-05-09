const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const cancelledFriendRequestRelationshipQueries = require("../../../../src/cypher-queries/relationships/CancelledSentFriendRequestRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/CancelledSentFriendRequestRelationshipQueries/deleteCancelledSentFriendRequestRelationshipBetweenUsers");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/CancelledSentFriendRequestRelationshipQueries/deleteCancelledSentFriendRequestRelationshipBetweenUsers";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing delete cancelled sent friend request relationship between users query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("delete cancelled sent friend request relationship between users query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
                dummyCancelledSentFriendRequestRelationshipsData
            }) => {
                _.forEach(dummyCancelledSentFriendRequestRelationshipsData, async function (dummyCancelledSentFriendRequestRelationship, i) {
                    await executeQuery(cancelledFriendRequestRelationshipQueries.deleteCancelledSentFriendRequestBetweenUsers.query, cancelledFriendRequestRelationshipQueries.deleteCancelledSentFriendRequestBetweenUsers.params(dummyCancelledSentFriendRequestRelationship.id))
                        .then(async (records) => {
                            console.log(records);
                            await assert(records instanceof Array, "records is an array");
                            await assert(records[0] instanceof Object, "records[0] is an object");
                            await assert(records[1] instanceof Object, "records[1] is an object");
                            await assert(records[2] instanceof Object, "records[2] is an object");

                            const startNodeTestObject = await createTestObject(records[1], ["User", "ID"]);
                            const endNodeTestObject = await createTestObject(records[2], ["User", "ID"]);

                            await assert(startNodeTestObject.id == dummyCancelledSentFriendRequestRelationship.fromId, "Start node id matches");
                            await assert(endNodeTestObject.id == dummyCancelledSentFriendRequestRelationship.toId, "End node id matches");
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