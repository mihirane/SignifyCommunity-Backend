class CommentQueries { }


CommentQueries.writeCommentOnPost = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        MATCH (n2:Post)
        WHERE n2.id = $postId
        WITH n1,n2
        CREATE (n1)-[:COMMENTED]->(n3:Comment{
            id: apoc.create.uuid() + ":" + n1.facebookId,
            text: $commentText,
            timeTakenToCommentInMilisecond: $timeTakenToCommentInMilisecond,
            uploadTime: datetime()
        })-[:ON]->(n2)
        RETURN n3
        `,
    params: function (facebookAccessToken, postId, commentText, timeTakenToCommentInMilisecond) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId,
            commentText: commentText,
            timeTakenToCommentInMilisecond: timeTakenToCommentInMilisecond
        };
    }
};

CommentQueries.writeCommentOnPostFromArrayOfCommentsData = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        UNWIND $commentsDataArray AS commentData
        MATCH (n2:Post)
        WHERE n2.id = commentData.postId
        WITH n1,n2,commentData
        CREATE (n1)-[:COMMENTED]->(n3:Comment{
            id: apoc.create.uuid() + ":" + n1.facebookId,
            text: commentData.text,
            timeTakenToCommentInMilisecond: commentData.timeTakenToCommentInMilisecond,
            uploadTime: datetime()
        })-[:ON]->(n2)
        RETURN n3
        `,
    params: function (facebookAccessToken, commentsDataArray) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentsDataArray: commentsDataArray
        };
    }
};

CommentQueries.deleteUploadedComment = {
    query: `
        MATCH (n1:Comment)
        WHERE n1.id = $commentId
        WITH n1
        REMOVE n1:Comment
        WITH n1
        SET n1:DeletedComment
        WITH n1
        SET n1.deletionTime = datetime()
        RETURN n1
        `,
    params: function (commentId) {
        return {
            commentId: commentId
        };
    }
};

CommentQueries.deleteAllCommentsOnPost = {
    query: `
        MATCH (n1:Post)
        WHERE n1.id = $postId
        WITH n1
        OPTIONAL MATCH (n1)<-[:ON]-(n2:Comment)
        WITH n1,n2
        REMOVE n2:Comment
        WITH n1,n2
        SET n2:DeletedComment
        WITH n1,n2
        SET n2.deletionTime = datetime()
        RETURN n1
        `,
    params: function (postId) {
        return {
            postId: postId
        };
    }
};

CommentQueries.returnIfCommentExists = {
    query: `
    OPTIONAL MATCH (n:Comment)
    WHERE n.id = $commentId
    RETURN n
    `,
    params: function (commentId) {
        return {
            commentId: commentId
        };
    }
};

CommentQueries.returnIfCommentIsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:COMMENTED]->(n2:Comment)
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

CommentQueries.getAllCommentsOnPost = {
    query: `
    MATCH (n1:Post)
    WHERE n1.id = $postId
    WITH n1
    OPTIONAL MATCH (n1)<-[:ON]-(n2:Comment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (postId) {
        return {
            postId: postId
        };

    }
};

CommentQueries.getAllCommentsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:COMMENTED]->(n2:Comment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

CommentQueries.getAllStarredCommentsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:COMMENTED]->(n2:Comment)
    WITH n1,n2
    OPTIONAL MATCH (n2)<-[:STARRED]-()
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

module.exports = CommentQueries;