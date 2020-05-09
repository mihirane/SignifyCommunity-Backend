const assert = require("assert");
const _ = require("lodash");
const driver = require("../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const commentQueries = require("../../../../src/cypher-queries/nodes/CommentQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/CommentQueries/writeCommentOnPostFromArrayOfCommentsData");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/CommentQueries/writeCommentOnPostFromArrayOfCommentsData";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing write comment on post from array of comments data query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("write comment on post from array of comments data query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    dummyCommentsData = await createTestObject(dummyCommentsData, ["Comment", "PostID"]);
                    await executeQuery(commentQueries.writeCommentOnPostFromArrayOfCommentsData.query, commentQueries.writeCommentOnPostFromArrayOfCommentsData.params(dummyUser.recentFacebookAccessToken, dummyCommentsData))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["Comment"]);
                            const dummyCommentsTestObject = await createTestObject(dummyCommentsData, ["Comment"]);
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