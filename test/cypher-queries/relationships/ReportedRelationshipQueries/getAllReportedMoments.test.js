const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const reportedRelationshipQueries = require("./../../../../src/cypher-queries/relationships/ReportedRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedMoments");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedMoments";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all reported moments query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all reported moments query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(reportedRelationshipQueries.getAllReportedMoments.query, reportedRelationshipQueries.getAllReportedMoments.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {
                            await assert(records instanceof Array, "records is an array");

                            const reportedMomentsTestObject = await createTestObject(records, ["Moment", "ID"]);
                            const expectedReportedMomentsTestObject = await createTestObject(records, ["Moment", "ID"]);
                            
                            await assert.deepStrictEqual(reportedMomentsTestObject, expectedReportedMomentsTestObject);
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