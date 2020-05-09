const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../src/neo4j-driver/neo4jDriver.js");
const currentUserService = require("./../../../src/services/CurrentUserService.js");
const getJSONFromCsv = require("./../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/services/CurrentUserService/updateAbout");
const createTestObject = require("./../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "services/CurrentUserService/updateAbout";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing update about service method", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("update about service method", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await currentUserService.updateAbout(dummyUser.recentFacebookAccessToken, "This is a test.")
                        .subscribe({
                            next: async(data) => {
                                const userTestObject = await createTestObject(data.properties, ["User", "UserHidden", "ID"]);
                                await assert.equal(userTestObject.about, "This is a test.");
                            },
                            complete: () => {},
                            error: err => console.log(error)
                        });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

});


