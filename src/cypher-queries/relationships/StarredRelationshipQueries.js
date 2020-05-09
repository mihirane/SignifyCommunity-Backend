class StarredRelationshipQueries { }


StarredRelationshipQueries.createStarredRelationshipWithComment = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        MATCH (n2:Comment)
        WHERE n2.id = $commentId
        WITH n1,n2
        CREATE (n1)-[r:STARRED{ 
            id: apoc.create.uuid() + ":" + n1.facebookId,
            seen: false,
            creationTime: datetime() 
        }]->(n2)
        RETURN r
        `,
    params: function (facebookAccessToken, commentId) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentId: commentId
        };
    }
};

StarredRelationshipQueries.returnIfCommentIsAlreadyStarred = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:STARRED]->(n2:Comment)
    WHERE n2.id = $commentId
    RETURN n2
    `,
    params: function (facebookAccessToken, commentId) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentId: commentId
        };

    }
};

StarredRelationshipQueries.getAllStarredComments = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        OPTIONAL MATCH (n1)-[:COMMENTED]->(n2:Comment)
        WITH n1,n2
        OPTIONAL MATCH (n2)<-[:STARRED]-(n3:User)
        RETURN n2
        ORDER BY n2.creationTime DESC
        `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};


module.exports = StarCommentQueries;