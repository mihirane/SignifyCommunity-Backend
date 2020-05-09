const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../src/neo4j-driver/neo4jDriver.js");
const currentUserService = require("./../../../src/services/CurrentUserService.js");
const getJSONFromCsv = require("./../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/services/CurrentUserService/getAllFriendsOfUser");
const createTestObject = require("./../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "services/CurrentUserService/getAllFriendsOfUser";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all friends of user service method", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all friends of user service method", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await currentUserService.getAllFriendsOfUser(dummyUser.recentFacebookAccessToken)
                        .subscribe({
                            next: async(data) => {
                                if(data != null && data != undefined){
                                    await _.forEach(dummyUser.friends, async function (friend, i) {
                                        const userTestObject = await createTestObject(data.properties, ["User", "UserHidden", "ID"]);
                                        const expectedUserTestObject = await createTestObject(friend, ["User", "UserHidden", "ID"]);
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


