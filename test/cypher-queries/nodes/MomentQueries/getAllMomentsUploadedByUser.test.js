const assert = require("assert");
const _ = require("lodash");
const driver = require("../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const momentQueries = require("../../../../src/cypher-queries/nodes/MomentQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/nodes/MomentQueries/getAllMomentsUploadedByUser");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/nodes/MomentQueries/getAllMomentsUploadedByUser";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all moments uploaded by user query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all moments uploaded by user query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(momentQueries.getAllMomentsUploadedByUser.query, momentQueries.getAllMomentsUploadedByUser.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");
                            const recordsTestObject = await createTestObject(records, ["Moment", "ID"]);
                            const dummyMomentsTestObject = await createTestObject(dummyUser.moments, ["Moment", "ID"]);
                            await assert.deepStrictEqual(recordsTestObject, dummyMomentsTestObject);
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