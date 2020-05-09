const { map } = require("rxjs/operators");
const driver = require("./../neo4j-driver/neo4jDriver.js");

const userQueries = require("./../cypher-queries/nodes/UserQueries.js");
const postQueries = require("./../cypher-queries/nodes/PostQueries.js");
const momentQueries = require("./../cypher-queries/nodes/MomentQueries.js");
const commentQueries = require("./../cypher-queries/nodes/CommentQueries.js");
const replyQueries = require("./../cypher-queries/nodes/ReplyQueries.js");

const sentFriendRequestRelationshipQueries = require("./../cypher-queries/relationships/SentFriendRequestRelationshipQueries.js");
const acceptedFriendRequestRelationshipQueries = require("./../cypher-queries/relationships/AcceptedFriendRequestRelationshipQueries.js");
const cancelledSentFriendRequestRelationshipQueries = require("./../cypher-queries/relationships/CancelledSentFriendRequestRelationshipQueries.js");
const declinedFriendRequestRelationshipQueries = require("./../cypher-queries/relationships/DeclinedFriendRequestRelationshipQueries.js");
const blockedRelationshipQueries = require("./../cypher-queries/relationships/BlockedRelationshipQueries.js");
const unblockedRelationshipQueries = require("./../cypher-queries/relationships/UnblockedRelationshipQueries.js");
const unfriendedRelationshipQueries = require("./../cypher-queries/relationships/UnfriendedRelationshipQueries.js");
const unstarredRelationshipQueries = require("./../cypher-queries/relationships/UnstarredRelationshipQueries.js");

class CurrentUserService {

    static getCurrentUserData(facebookAccessToken) {
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(userQueries.getCurrentUserInfo.query, userQueries.getCurrentUserInfo.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n");
                        })
                    );
            });
    }

    static getAllSentFriendRequests(facebookAccessToken) {
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsByUser.query, sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllReceivedFriendRequests(facebookAccessToken) {
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsToUser.query, sentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsToUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllFriendsOfUser(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(acceptedFriendRequestRelationshipQueries.getAllFriendsOfUser.query, acceptedFriendRequestRelationshipQueries.getAllFriendsOfUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllBlockedUsersByUser(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(blockedRelationshipQueries.getAllBlockedUsers.query, blockedRelationshipQueries.getAllBlockedUsers.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllUploadedPosts(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(postQueries.getAllUploadedPostsByUser.query, postQueries.getAllUploadedPostsByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllAddedMoments(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(momentQueries.getAllMomentsUploadedByUser.query, momentQueries.getAllMomentsUploadedByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllUploadedComments(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(commentQueries.getAllCommentsUploadedByUser.query, commentQueries.getAllCommentsUploadedByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllUploadedCommentsWhichAreStarred(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(commentQueries.getAllStarredCommentsUploadedByUser.query, commentQueries.getAllStarredCommentsUploadedByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static getAllUploadedCommentsWhichAreStarred(facebookAccessToken){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(commentQueries.getAllStarredCommentsUploadedByUser.query, commentQueries.getAllStarredCommentsUploadedByUser.params(facebookAccessToken))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n2");
                        })
                    );
            });
    }

    static updateGender(facebookAccessToken, gender){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(userQueries.updateGenderOfUser.query, userQueries.updateGenderOfUser.params(facebookAccessToken, gender))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n");
                        })
                    );
            });
    }

    static updateAbout(facebookAccessToken, about){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(userQueries.updateAboutOfUser.query, userQueries.updateAboutOfUser.params(facebookAccessToken, about))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n");
                        })
                    );
            });
    }

    static updateProfileImage(facebookAccessToken, profileImageUrl){
        return driver
            .rxSession()
            .readTransaction(txc => {
                return txc
                    .run(userQueries.updateProfileImageOfUser.query, userQueries.updateProfileImageOfUser.params(facebookAccessToken, profileImageUrl))
                    .records()
                    .pipe(
                        map(record => {
                            return record.get("n");
                        })
                    );
            });
    }

}

module.exports = CurrentUserService;