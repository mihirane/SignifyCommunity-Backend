const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const unblockedRelationshipQueries = require("./../../../../src/cypher-queries/relationships/UnblockedRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/UnblockedRelationshipQueries/returnIfUnblockedRelationshipExistBetweenUsers");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/UnblockedRelationshipQueries/returnIfUnblockedRelationshipExistBetweenUsers";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing return if unblocked relationship exist between users query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("return if unblocked relationship exist between users query", () => {
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
                        await executeQuery(unblockedRelationshipQueries.returnIfUnblockedRelationshipExistBetweenUsers.query, unblockedRelationshipQueries.returnIfUnblockedRelationshipExistBetweenUsers.params(dummyUsersData[i].recentFacebookAccessToken, dummyUsersData[j].id))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");

                                const startNodeTestObject = await createTestObject(records[1], ["User", "ID"]);
                                const endNodeTestObject = await createTestObject(records[2], ["User", "ID"]);

                                if (startNodeTestObject != undefined && endNodeTestObject != undefined) {
                                    await assert(startNodeTestObject.id == dummyUsersData[i].id, "Start node id matches");
                                    await assert(endNodeTestObject.id == dummyUsersData[j].id, "End node id matches");
                                }
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