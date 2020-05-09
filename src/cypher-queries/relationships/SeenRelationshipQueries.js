class SeenRelationshipQueries { }


SeenRelationshipQueries.createSeenRelationshipWithPost = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Post)
    WHERE n2.id = $postId
    WITH n1,n2
    CREATE (n1)-[r:SEEN{ 
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, postId) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId
        };
    }
};

SeenRelationshipQueries.createSeenRelationshipWithMoment = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Moment)
    WHERE n2.id = $momentId
    WITH n1,n2
    CREATE (n1)-[r:SEEN{ 
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, momentId) {
        return {
            facebookAccessToken: facebookAccessToken,
            momentId: momentId
        };
    }
};

SeenRelationshipQueries.createSeenRelationshipWithComment = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Comment)
    WHERE n2.id = $commentId
    WITH n1,n2
    CREATE (n1)-[r:SEEN{ 
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, commentId) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentId: commentId
        };
    }
};

SeenRelationshipQueries.createSeenRelationshipWithReply = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Reply)
    WHERE n2.id = $replyId
    WITH n1,n2
    CREATE (n1)-[r:SEEN{ 
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, replyId) {
        return {
            facebookAccessToken: facebookAccessToken,
            replyId: replyId
        };
    }
};

SeenRelationshipQueries.getAllSeenPosts = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:SEEN]->(n2:Post)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

SeenRelationshipQueries.getAllSeenMoments = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:SEEN]->(n2:Moment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

SeenRelationshipQueries.getAllSeenComments = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:SEEN]->(n2:Comment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken){
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

SeenRelationshipQueries.getAllSeenReplies = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:SEEN]->(n2:Reply)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

module.exports = SeenRelationshipQueries;