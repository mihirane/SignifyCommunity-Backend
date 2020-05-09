const assert = require("assert");
const _ = require("lodash");
const driver = require("../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const replyQueries = require("../../../../src/cypher-queries/nodes/ReplyQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/ReplyQueries/getAllRepliesOnComment");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/ReplyQueries/getAllRepliesOnComment";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing return if reply exists query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("return if reply exists query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyCommentsData, async function (dummyComment, i) {
                    await executeQuery(replyQueries.getAllRepliesOnComment.query, replyQueries.getAllRepliesOnComment.params(dummyComment.id))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["Reply", "ID"]);
                            const dummyRepliesTestObject = await createTestObject(dummyComment.replies, ["Reply", "ID"]);
                            assert.deepStrictEqual(recordsTestObject, dummyRepliesTestObject);
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