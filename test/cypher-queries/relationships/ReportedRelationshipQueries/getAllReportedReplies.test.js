const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const reportedRelationshipQueries = require("./../../../../src/cypher-queries/relationships/ReportedRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedReplies");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/ReportedRelationshipQueries/getAllReportedReplies";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all reported replies query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all reported replies query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await executeQuery(reportedRelationshipQueries.getAllReportedReplies.query, reportedRelationshipQueries.getAllReportedReplies.params(dummyUser.recentFacebookAccessToken))
                        .then(async (records) => {console.log(records)
                            await assert(records instanceof Array, "records is an array");

                            const reportedRepliesTestObject = await createTestObject(records, ["Reply", "ID"]);
                            
                            await assert.deepStrictEqual(reportedRepliesTestObject, dummyUser.reportedReplies);
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