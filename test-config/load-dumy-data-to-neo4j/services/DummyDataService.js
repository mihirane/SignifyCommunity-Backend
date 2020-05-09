const DummyDataQueries = require("./../cypher-queries/DummyDataQueries.js");

class DummyDataService {

    constructor(driver, csvFilesPath) {
        this.driver = driver;
        this.session = driver.session();
        this.dummyDataQueries = new DummyDataQueries(csvFilesPath);
    }

    createDummyUsers() {
        return this.session.run(this.dummyDataQueries.createDummyUsers(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyPosts() {
        return this.session.run(this.dummyDataQueries.createDummyPosts(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyTagsOfPost() {
        return this.session.run(this.dummyDataQueries.createDummyTagsOfPost(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyMoments() {
        return this.session.run(this.dummyDataQueries.createDummyMoments(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyComments() {
        return this.session.run(this.dummyDataQueries.createDummyComments(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyReplies() {
        return this.session.run(this.dummyDataQueries.createDummyReplies(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummySentFriendRequestRelationships() {
        return this.session.run(this.dummyDataQueries.createDummySentFriendRequestRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyCancelledSentFriendRequestRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyCancelledSentFriendRequestRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyAcceptedFriendRequestRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyAcceptedFriendRequestRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyDeclinedFriendRequestRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyDeclinedFriendRequestRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyUnfriendedRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyUnfriendedRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyBlockedRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyBlockedRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyUnblockedRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyUnblockedRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyStarredRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyStarredRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyUnstarredRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyUnstarredRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyReportedPostRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyReportedPostRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyReportedMomentRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyReportedMomentRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyReportedCommentRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyReportedCommentRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummyReportedReplyRelationships() {
        return this.session.run(this.dummyDataQueries.createDummyReportedReplyRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummySeenPostRelationships() {
        return this.session.run(this.dummyDataQueries.createDummySeenPostRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummySeenMomentRelationships() {
        return this.session.run(this.dummyDataQueries.createDummySeenMomentRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummySeenCommentRelationships() {
        return this.session.run(this.dummyDataQueries.createDummySeenCommentRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    createDummySeenReplyRelationships() {
        return this.session.run(this.dummyDataQueries.createDummySeenReplyRelationships(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteAllData() {
        return this.session.run(this.dummyDataQueries.deleteAllData(), {})
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

}

module.exports = DummyDataService;