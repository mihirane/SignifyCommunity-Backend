const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const momentQueries = require("./../../../../src/cypher-queries/nodes/MomentQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/MomentQueries/addMomentToPost");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/MomentQueries/addMomentToPost";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing add moment to post query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("add moment to post query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummyMomentsData, async function (dummyMoment, j) {
                            await executeQuery(momentQueries.addMomentToPost.query, momentQueries.addMomentToPost.params(dummyUser.recentFacebookAccessToken, dummyMoment.postId, dummyMoment.imageUrl, dummyMoment.caption, 1000))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                const recordsTestObject = await createTestObject(records[0], ["Moment"]);
                                const dummyMomentTestObject = await createTestObject(dummyMoment, ["Moment"]);
                                await assert.deepStrictEqual(recordsTestObject, dummyMomentTestObject);
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