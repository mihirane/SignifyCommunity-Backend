const assert = require("assert");
const _ = require("lodash");
const driver = require("../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const replyQueries = require("../../../../src/cypher-queries/nodes/ReplyQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/ReplyQueries/returnIfReplyExists");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/ReplyQueries/returnIfReplyExists";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing write reply query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("write reply query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummyRepliesData, async function (dummyReply, j) {
                        await executeQuery(replyQueries.writeReply.query, replyQueries.writeReply.params(dummyUser.recentFacebookAccessToken, dummyReply.commentId, dummyReply.text))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                const recordsTestObject = await createTestObject(records[0], ["Reply"]);
                                const dummyReplyTestObject = await createTestObject(dummyReply, ["Reply"]);
                                assert.deepStrictEqual(recordsTestObject, dummyReplyTestObject);
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