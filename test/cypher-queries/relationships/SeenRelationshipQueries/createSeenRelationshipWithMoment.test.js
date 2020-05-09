const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../../src/neo4j-driver/neo4jDriver.js");
const executeQuery = require("./../../../../test-config/neo4j-common-query-executor/executeQuery.js");
const seenRelationshipQueries = require("./../../../../src/cypher-queries/relationships/SeenRelationshipQueries.js");
const getJSONFromCsv = require("../../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/cypher-queries/relationships/SeenRelationshipQueries/createSeenRelationshipWithMoment");
const createTestObject = require("../../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "cypher-queries/relationships/SeenRelationshipQueries/createSeenRelationshipWithMoment";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing create seen relationship with moment query", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("create seen relationship with moment query", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData,
                dummySeenMomentRelationshipsData
            }) => {
                _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await _.forEach(dummySeenMomentRelationshipsData, async function (dummySeenMomentRelationship, i) {
                        await executeQuery(seenRelationshipQueries.createSeenRelationshipWithMoment.query, seenRelationshipQueries.createSeenRelationshipWithMoment.params(dummyUser.recentFacebookAccessToken, dummySeenMomentRelationship.momentId))
                            .then(async (records) => {
                                await assert(records instanceof Array, "records is an array");
                                await assert(records[0] instanceof Object, "records[0] is an object");
                                await assert(records[1] instanceof Object, "records[1] is an object");
                                await assert(records[2] instanceof Object, "records[2] is an object");

                                const startNodeUserTestObject = await createTestObject(records[1], ["User", "UserHidden", "ID"]);
                                const endNodeMomentTestObject = await createTestObject(records[2], ["Moment", "ID"]);

                                await assert(startNodeUserTestObject.recentFacebookAccessToken == dummyUser.recentFacebookAccessToken, "user facebook access token matches");
                                await assert(endNodeMomentTestObject.id == dummySeenMomentRelationship.momentId, "moment id matches");
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