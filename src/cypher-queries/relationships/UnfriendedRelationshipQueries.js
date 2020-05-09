class UnfriendedRelationshipQueries { }


UnfriendedRelationshipQueries.createUnfriendedRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    CREATE (n1)-[r:UNFRIENDED{
        id: apoc.create.uuid() + ":" + n1.facebookId,
        creationTime: datetime()
    }]->(n2)
    RETURN r
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};

UnfriendedRelationshipQueries.deleteUnfriendedRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $unfriendedRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_UNFRIENDED{
        id: r.id,
        creationTime: r.creationTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (unfriendedRelationshipId) {
        return {
            unfriendedRelationshipId: unfriendedRelationshipId
        };
    }
};

UnfriendedRelationshipQueries.returnIfUnfriendedRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:UNFRIENDED]-(n2)
    RETURN type(r), startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};


module.exports = UnfriendedRelationshipQueries;