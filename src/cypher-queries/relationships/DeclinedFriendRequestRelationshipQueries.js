class DeclinedFriendRequestRelationshipQueries{}


DeclinedFriendRequestRelationshipQueries.createDeclinedFriendRequestRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $sentFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DECLINED_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: r.seenSentFriendRequest,
        creationTime: r.creationTime,
        declinationTime: datetime()
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

DeclinedFriendRequestRelationshipQueries.deleteDeclinedFriendRequestRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $declinedFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_DECLINED_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: r.seenSentFriendRequest,
        creationTime: r.creationTime,
        declinationTime: r.declinationTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (declinedFriendRequestRelationshipId) {
        return {
            declinedFriendRequestRelationshipId: declinedFriendRequestRelationshipId
        };
    }
};

DeclinedFriendRequestRelationshipQueries.returnIfDeclinedFriendRequestRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:DECLINED_FRIEND_REQUEST]-(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};


module.exports = DeclinedFriendRequestRelationshipQueries;