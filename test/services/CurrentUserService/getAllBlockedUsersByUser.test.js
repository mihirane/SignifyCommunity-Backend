const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../src/neo4j-driver/neo4jDriver.js");
const currentUserService = require("./../../../src/services/CurrentUserService.js");
const getJSONFromCsv = require("./../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/services/CurrentUserService/getAllBlockedUsersByUser");
const createTestObject = require("./../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "services/CurrentUserService/getAllBlockedUsersByUser";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all blocked users by user service method", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all blocked users by user service method", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await currentUserService.getAllBlockedUsersByUser(dummyUser.recentFacebookAccessToken)
                        .subscribe({
                            next: async(data) => {
                                if(data != null && data != undefined){
                                    await _.forEach(dummyUser.blockedUsers, async function (blockedUser, i) {
                                        const userTestObject = await createTestObject(data.properties, ["User", "UserHidden", "ID"]);
                                        const expectedUserTestObject = await createTestObject(blockedUser, ["User", "UserHidden", "ID"]);
                                        await assert.deepStrictEqual(userTestObject, expectedUserTestObject);
                                    }); 
                                }
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


