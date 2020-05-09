const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const reportedRelationshipQueries = require("./../../../../src/cypher-queries/relationships/ReportedRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedComments");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedComments";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all reported comments query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all reported comments query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(reportedRelationshipQueries.getAllReportedComments.query, reportedRelationshipQueries.getAllReportedComments.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {console.log(records)
                            await assert(records instanceof Array, "records is an array");

                            const reportedCommentsTestObject = await createTestObject(records, ["Comment", "ID"]);
                            const expectedReportedCommentsTestObject = await createTestObject(records, ["Comment", "ID"]);
                            
                            await assert.deepStrictEqual(reportedCommentsTestObject, expectedReportedCommentsTestObject);
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