const assert = require("assert");
const _ = require("lodash");
const driver = require("./../../../src/neo4j-driver/neo4jDriver.js");
const currentUserService = require("./../../../src/services/CurrentUserService.js");
const getJSONFromCsv = require("./../../../test-config/get-json-from-csv/getJSONFromCsv.js")("test-config/dummy-data-csv-files/services/CurrentUserService/getAllUploadedCommentsWhichAreStarred");
const createTestObject = require("./../../../test-config/create-test-object/createTestObject.js");
const LoadDummyDataToNeo4j = require("./../../../test-config/load-dumy-data-to-neo4j/loadDummyDataToNeo4j.js");
const csvFilesPath = "services/CurrentUserService/getAllUploadedCommentsWhichAreStarred";

const loadDummyDataToNeo4j = new LoadDummyDataToNeo4j(driver, csvFilesPath);

describe("Testing get all uploaded comments which are starred service method", () => {

    beforeEach(() => {
        return loadDummyDataToNeo4j.createDummyData();
    });

    afterEach(() => {
        return loadDummyDataToNeo4j.deleteAllData();
    });

    it("get all uploaded comments which are starred service method", () => {
        return getJSONFromCsv
            .then(async ({
                dummyUsersData,
                dummyPostsData,
                dummyMomentsData,
                dummyCommentsData,
                dummyRepliesData
            }) => {
                await _.forEach(dummyUsersData, async function (dummyUser, i) {
                    await currentUserService.getAllUploadedCommentsWhichAreStarred(dummyUser.recentFacebookAccessToken)
                        .subscribe({
                            next: async(data) => {console.log(data)
                                if(data != null && data != undefined){
                                    await _.forEach(dummyUser.starredComments, async function (starredComment, i) {
                                        const commentTestObject = await createTestObject(data.properties, ["Comment", "ID"]);
                                        const expectedCommentTestObject = await createTestObject(starredComment, ["Comment", "ID"]);
                                        await assert.deepStrictEqual(commentTestObject, expectedCommentTestObject);
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


