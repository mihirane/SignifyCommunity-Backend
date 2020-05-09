const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const reportedRelationshipQueries = require("./../../../../src/cypher-queries/relationships/ReportedRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/ReportedRelationshipQueries/createReportedRelationshipWithMoment");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/ReportedRelationshipQueries/createReportedRelationshipWithMoment";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing create reported relationship with moment query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("create reported relationship with moment query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
                dummyReportedMomentRelationshipsData
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummyReportedMomentRelationshipsData, async function (dummyReportedMomentRelationship, i) {
                        await executeQuery(reportedRelationshipQueries.createReportedRelationshipWithMoment.query, reportedRelationshipQueries.createReportedRelationshipWithMoment.params(dummyUser.recentFacebookAccessToken, dummyReportedMomentRelationship.reportingId, dummyReportedMomentRelationship.reportText))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                await assert(records[1] instanceof Object, "records[1] is an object");
                                await assert(records[2] instanceof Object, "records[2] is an object");

                                const startNodeUserTestObject = await createTestObject(records[1], ["User", "UserHidden", "ID"]);
                                const endNodeMomentTestObject = await createTestObject(records[2], ["Moment", "ID"]);

                                await assert(startNodeUserTestObject.recentFacebookAccessToken == dummyUser.recentFacebookAccessToken, "user facebook access token matches");
                                await assert(endNodeMomentTestObject.id == dummyReportedMomentRelationship.reportingId, "moment id matches");
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