const assert = require("assert");
const _ = require("lodash");
const driver = require("../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const commentQueries = require("../../../../src/cypher-queries/nodes/CommentQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/CommentQueries/getAllCommentsOnPost");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/CommentQueries/getAllCommentsOnPost";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all comments on post query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all comments on post query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyPostsData, async function (dummyPost, i) {
                    await executeQuery(commentQueries.getAllCommentsOnPost.query, commentQueries.getAllCommentsOnPost.params(dummyPost.id))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["Comment", "ID"]);
                            const dummyCommentsTestObject = await createTestObject(dummyPost.comments, ["Comment", "ID"]);
                            await assert.deepStrictEqual(recordsTestObject, dummyCommentsTestObject);
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