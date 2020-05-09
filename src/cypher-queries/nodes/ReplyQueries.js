class ReplyQueries { }

ReplyQueries.returnIfReplyExists = {
    query: `
    OPTIONAL MATCH (n:Reply)
    WHERE n.id = $replyId
    RETURN n
    `,
    params: function (replyId) {
        return {
            replyId: replyId
        };
    }
};

ReplyQueries.returnIfReplyIsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:REPLIED]->(n2:Reply)
    WHERE n2.id = $replyId
    RETURN n2
    `,
    params: function (facebookAccessToken, replyId) {
        return {
            facebookAccessToken: facebookAccessToken,
            replyId: replyId
        };
    }
};

ReplyQueries.writeReply = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        OPTIONAL MATCH (n2:Comment)
        WHERE n2.id = $commentId
        WITH n1,n2
        CREATE (n1)-[:REPLIED]->(n3:Reply{
            id: apoc.create.uuid() + ":" + n1.facebookId,
            text: $replyText,
            creationTime: datetime()
        })-[:TO]->(n2)
        RETURN n3
        `,
    params: function (facebookAccessToken, commentId, replyText) {
        return {
            facebookAccessToken: facebookAccessToken,
            commentId: commentId,
            replyText: replyText
        };
    }
};

ReplyQueries.deleteUploadedReply = {
    query: `
        MATCH (n1:Reply)
        WHERE n1.id = $replyId
        WITH n1
        REMOVE n1:Reply
        WITH n1
        SET n1:DeletedReply
        WITH n1
        SET n1.deletionTime = datetime()
        RETURN n1
        `,
    params: function (replyId) {
        return {
            replyId: replyId
        };
    }
};

ReplyQueries.deleteAllRepliesOnComment = {
    query: `
        MATCH (n1:Comment)
        WHERE n1.id = $commentId
        WITH n1
        OPTIONAL MATCH (n1)<-[:TO]-(n2:Reply)
        WITH n1,n2
        REMOVE n2:Reply
        WITH n1,n2
        SET n2:DeletedReply
        WITH n1,n2
        SET n2.deletionTime = datetime()
        RETURN n1
        `,
    params: function (commentId) {
        return {
            commentId: commentId
        };
    }
};

ReplyQueries.getAllRepliesOnComment = {
    query: `
    MATCH (n1:Comment)
    WHERE n1.id = $commentId
    WITH n1
    OPTIONAL MATCH (n1)<-[:TO]-(n2:Reply)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (commentId) {
        return {
            commentId: commentId
        };
    }
};

module.exports = ReplyQueries;
