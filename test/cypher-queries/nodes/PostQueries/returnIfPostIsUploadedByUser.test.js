const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const postQueries = require("./../../../../src/cypher-queries/nodes/PostQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/PostQueries/returnIfPostIsUploadedByUser");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/PostQueries/returnIfPostIsUploadedByUser";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing return if post is uploaded by user query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("return if post is uploaded by user query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummyPostsData, async function (dummyPost, j) {
                        if(dummyUser.id == dummyPost.userId){
                            await executeQuery(postQueries.returnIfPostIsUploadedByUser.query, postQueries.returnIfPostIsUploadedByUser.params(dummyUser.recentFacebookAccessToken, dummyPost.id))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                const recordsTestObject = await createTestObject(records[0], ["Post", "ID"]);
                                const dummyPostTestObject = await createTestObject(dummyPost, ["Post", "ID"]);
                                await assert.deepStrictEqual(recordsTestObject, dummyPostTestObject);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        }   
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

});