const { of, throwError } = require("rxjs");
const { map, flatMap, concat, catchError } = require("rxjs/operators");
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


class UserRelationshipService {

    static sendFriendRequest(fromFacebookAccessToken, toId) {
        return driver
            .rxSession()
            .beginTransaction()
            .pipe(
                flatMap(txc => {
                    concat(
                        txc
                            .run(userQueries.returnRelationshipBetweenUsers.query, userQueries.returnRelationshipBetweenUsers.params(fromFacebookAccessToken, toId))
                            .records()
                            .pipe(
                                map(record => {
                                    record.get("r");
                                })
                            ),

                    ).pipe(catchError(error => {
                        txc
                            .rollback()
                            .pipe(throwError(error))
                    }))
                })
            )
    }

}