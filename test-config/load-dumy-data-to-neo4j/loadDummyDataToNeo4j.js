const DummyDataService = require("./services/DummyDataService.js");

class DummyData {
    
    constructor(driver, csvFilesPath) {
        this.dummyDataService = new DummyDataService(driver, csvFilesPath);
    }

    async createDummyData() {
        await this.dummyDataService.createDummyUsers()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyPosts()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyTagsOfPost()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyMoments()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyComments()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyReplies()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummySentFriendRequestRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyCancelledSentFriendRequestRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyAcceptedFriendRequestRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyDeclinedFriendRequestRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyUnfriendedRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyBlockedRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyUnblockedRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyStarredRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyUnstarredRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyReportedPostRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyReportedMomentRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);
        
        await this.dummyDataService.createDummyReportedCommentRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummyReportedReplyRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummySeenPostRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummySeenMomentRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummySeenCommentRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);

        await this.dummyDataService.createDummySeenReplyRelationships()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);
        
    }

    async deleteAllData() {
        await this.dummyDataService.deleteAllData()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        await setTimeout(() => { }, 1000);
    }
}

module.exports = DummyData;