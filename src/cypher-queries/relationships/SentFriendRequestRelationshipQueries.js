class SentFriendRequestRelationshipQueries { }


SentFriendRequestRelationshipQueries.createSentFriendRequestRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    CREATE (n1)-[r:SENT_FRIEND_REQUEST{ 
        id: apoc.create.uuid() + ":" + n1.facebookId,
        seenSentFriendRequest: false,
        creationTime: datetime() 
    }]->(n2)
    RETURN r,startNode(r),endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};

SentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:SENT_FRIEND_REQUEST]->(n2:User)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

SentFriendRequestRelationshipQueries.getAllSentFriendRequestRelationshipsToUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)<-[:SENT_FRIEND_REQUEST]-(n2:User)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

SentFriendRequestRelationshipQueries.returnIfSentFriendRequestRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:SENT_FRIEND_REQUEST]-(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};



module.exports = SentFriendRequestRelationshipQueries;