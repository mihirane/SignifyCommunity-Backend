class UnblockedRelationshipQueries{}


UnblockedRelationshipQueries.createUnblockedRelationshipBetweenUsers = {
    query: `
    MATCH (n1:user)-[r]->(n2:User)
    WHERE r.id = $blockedRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:UNBLOCKED{
        id: r.id,
        creationTime: r.creationTime,
        unblockTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (blockedRelationshipId) {
        return {
            blockedRelationshipId: blockedRelationshipId
        };
    }
};

UnblockedRelationshipQueries.deleteUnblockedRelationshipBetweenUsers = {
    query: `
    MATCH (n1:user)-[r]->(n2:User)
    WHERE r.id = $unblockedRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_UNBLOCKED{
        id: r.id,
        creationTime: r.creationTime,
        unblockTime: r.unblockTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
    `,
    params: function (unblockedRelationshipId) {
        return {
            unblockedRelationshipId: unblockedRelationshipId
        };
    }
};

UnblockedRelationshipQueries.returnIfUnblockedRelationshipExistBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r:UNBLOCKED]-(n2)
    RETURN type(r), startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};


module.exports = UnblockedRelationshipQueries;