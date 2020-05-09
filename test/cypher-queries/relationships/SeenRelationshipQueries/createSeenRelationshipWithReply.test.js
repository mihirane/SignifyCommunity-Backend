const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const seenRelationshipQueries = require("./../../../../src/cypher-queries/relationships/SeenRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/SeenRelationshipQueries/createSeenRelationshipWithReply");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/SeenRelationshipQueries/createSeenRelationshipWithReply";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing create seen relationship with reply query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("create seen relationship with reply query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
                dummySeenReplyRelationshipsData
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummySeenReplyRelationshipsData, async function (dummySeenReplyRelationship, i) {
                        await executeQuery(seenRelationshipQueries.createSeenRelationshipWithReply.query, seenRelationshipQueries.createSeenRelationshipWithReply.params(dummyUser.recentFacebookAccessToken, dummySeenReplyRelationship.replyId))
                            .then(async (records) => {console.log(records)
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                await assert(records[1] instanceof Object, "records[1] is an object");
                                await assert(records[2] instanceof Object, "records[2] is an object");

                                const startNodeUserTestObject = await createTestObject(records[1], ["User", "UserHidden", "ID"]);
                                const endNodeReplyTestObject = await createTestObject(records[2], ["Reply", "ID"]);

                                await assert(startNodeUserTestObject.recentFacebookAccessToken == dummyUser.recentFacebookAccessToken, "user facebook access token matches");
                                await assert(endNodeReplyTestObject.id == dummySeenReplyRelationship.replyId, "reply id matches");
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