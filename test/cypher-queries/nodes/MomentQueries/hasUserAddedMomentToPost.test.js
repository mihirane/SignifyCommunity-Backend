const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const momentQueries = require("./../../../../src/cypher-queries/nodes/MomentQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/MomentQueries/hasUserAddedMomentToPost");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/MomentQueries/hasUserAddedMomentToPost";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing has user added moment to post query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("has user added moment to post query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyPostsData, async function (dummyPost, i) {
                    await _.forEach(dummyUsersData, async function (dummyUser, j) {
                        await _.forEach(dummyMomentsData, async function (dummyMoment, k) {
                            if (dummyPost.id == dummyMoment.postId) {
                                if(dummyUser.id == dummyMoment.userId){
                                    await executeQuery(momentQueries.hasUserAddedMomentToPost.query, momentQueries.hasUserAddedMomentToPost.params(dummyUser.recentFacebookAccessToken, dummyPost.id))
                                    .then(async (records) => {
                                        await assert(records instanceof Array, "records is an array");
                                        await assert(records[0] instanceof Object, "records[0] is an object");
                                        const recordsTestObject = await createTestObject(records[0], ["Moment", "ID"]);
                                        const dummyMomentTestObject = await createTestObject(dummyMoment, ["Moment", "ID"]);
                                        await assert.deepStrictEqual(recordsTestObject, dummyMomentTestObject);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                                }
                            }
                        });
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

});