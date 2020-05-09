class ReportedRelationshipQueries { }


ReportedRelationshipQueries.createReportedRelationshipWithPost = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Post)
    WHERE n2.id = $postId
    WITH n1,n2
    CREATE (n1)-[r:REPORTED{ 
        reportText: $reportText,
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, postId, reportText) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId,
            reportText: reportText
        };
    }
};

ReportedRelationshipQueries.createReportedRelationshipWithMoment = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Moment)
    WHERE n2.id = $momentId
    WITH n1,n2
    CREATE (n1)-[r:REPORTED{ 
        reportText: $reportText,
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, momentId, reportText) {
        return {
            facebookAccessToken: facebookAccessToken,
            momentId: momentId,
            reportText: reportText
        };
    }
};

ReportedRelationshipQueries.createReportedRelationshipWithComment = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Comment)
    WHERE n2.id = $commentId
    WITH n1,n2
    CREATE (n1)-[r:REPORTED{
        reportText: $reportText,
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, commentId, reportText) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentId: commentId,
            reportText: reportText
        };
    }
};

ReportedRelationshipQueries.createReportedRelationshipWithReply = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Reply)
    WHERE n2.id = $replyId
    WITH n1,n2
    CREATE (n1)-[r:REPORTED{
        reportText: $reportText, 
        creationTime: datetime() 
    }]->(n2)
    RETURN r, startNode(r), endNode(r)
    `,
    params: function (facebookAccessToken, replyId, reportText) {
        return {
            facebookAccessToken: facebookAccessToken,
            replyId: replyId,
            reportText: reportText
        };
    }
};

ReportedRelationshipQueries.getAllReportedPosts = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:REPORTED]->(n2:Post)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken){
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

ReportedRelationshipQueries.getAllReportedMoments = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:REPORTED]->(n2:Moment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken){
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

ReportedRelationshipQueries.getAllReportedComments = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:REPORTED]->(n2:Comment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken){
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

ReportedRelationshipQueries.getAllReportedReplies = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[r:REPORTED]->(n2:Reply)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken){
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

module.exports = ReportedRelationshipQueries;