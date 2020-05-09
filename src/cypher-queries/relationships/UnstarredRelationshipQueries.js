class UnstarredRelationshipQueries { }


UnstarredRelationshipQueries.createUnstarredRelationshipWithComment = {
    query: `
    MATCH (n1:User)-[r]->(n2:User)
    WHERE r.id = $starredRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:UNSTARRED{
        id: r.id,
        seen: r.seen,
        creationTime: r.creationTime,
        unstarredTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
         `,
    params: function (starredRelationshipId) {
        return {
            starredRelationshipId: starredRelationshipId
        };

    }
};

UnstarredRelationshipQueries.deleteUnstarredRelationshipWithComment = {
    query: `
    MATCH (n1:User)-[r]-(n2:User)
    WHERE r.id = $unstarredRelationshipId
    WITH n1,r,n2
    CREATE (n1)-[r2:DELETED_UNSTARRED{
        id: r.id,
        seen: r.seen,
        creationTime: r.creationTime,
        unstarredTime: r.unstarredTime,
        deletionTime: datetime()
    }]->(n2)
    WITH n1,r,r2,n2
    DELETE r
    WITH r2
    RETURN r2, startNode(r2), endNode(r2)
         `,
    params: function (unstarredRelationshipId) {
        return {
            unstarredRelationshipId: unstarredRelationshipId
        };

    }
};

module.exports = UnstarredRelationshipQueries;