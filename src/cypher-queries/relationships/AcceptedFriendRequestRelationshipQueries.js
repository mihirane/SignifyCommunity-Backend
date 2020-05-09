class AcceptedFriendRequestRelationshipQueries { }


AcceptedFriendRequestRelationshipQueries.createAcceptedFriendRequestRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $sentFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:ACCEPTED_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: true,
        creationTime: r.creationTime,
        acceptionTime: datetime()
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

AcceptedFriendRequestRelationshipQueries.deleteAcceptedFriendRequestRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)-[r:ACCEPTED_FRIEND_REQUEST]-(n2:User)
    WHERE r.id = $acceptedFriendRequestRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_ACCEPTED_FRIEND_REQUEST{
        id: r.id,
        seenSentFriendRequest: true,
        creationTime: r.creationTime,
        acceptionTime: r.acceptionTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (acceptedFriendRequestRelationshipId) {
        return {
            acceptedFriendRequestRelationshipId: acceptedFriendRequestRelationshipId
        };
    }
};

AcceptedFriendRequestRelationshipQueries.getAllFriendsOfUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:ACCEPTED_FRIEND_REQUEST]-(n2:User)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

AcceptedFriendRequestRelationshipQueries.returnIfAcceptedFriendRequestRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:ACCEPTED_FRIEND_REQUEST]-(n2)
    RETURN type(r), startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};


module.exports = AcceptedFriendRequestRelationshipQueries;