class CancelledSentFriendRequestRelationshipQueries{}


CancelledSentFriendRequestRelationshipQueries.createCancelledSentFriendRequestBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $sentFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:CANCELLED_SENT_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: r.seenSentFriendRequest,
        creationTime: r.creationTime,
        cancellationTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (sentFriendRequestRelationshipId) {
        return {
            sentFriendRequestRelationshipId: sentFriendRequestRelationshipId
        };
    }
};

CancelledSentFriendRequestRelationshipQueries.deleteCancelledSentFriendRequestBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $cancelledSentFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_CANCELLED_SENT_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: r.seenSentFriendRequest,
        creationTime: r.creationTime,
        cancellationTime: r.cancellationTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (cancelledSentFriendRequestRelationshipId) {
        return {
            cancelledSentFriendRequestRelationshipId: cancelledSentFriendRequestRelationshipId
        };
    }
};

CancelledSentFriendRequestRelationshipQueries.returnIfCancelledSentFriendRequestRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:CANCELLED_SENT_FRIEND_REQUEST]-(n2)
    RETURN type(r), startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};


module.exports = CancelledSentFriendRequestRelationshipQueries;