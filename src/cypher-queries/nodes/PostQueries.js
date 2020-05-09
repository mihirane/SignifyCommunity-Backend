class PostQueries { }


PostQueries.returnIfPostExists = {
    query: `
    OPTIONAL MATCH (n:Post)
    WHERE n.id = $postId
    RETURN n
    `,
    params: function (postId) {
        return {
            postId: postId
        };
    }
};

PostQueries.returnIfPostIsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:UPLOADED]->(n2:Post)
    WHERE n2.id = $postId
    RETURN n2
    `,
    params: function (facebookAccessToken, postId) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId
        };

    }
};

PostQueries.getAllUploadedPostsByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:UPLOADED]->(n2:Post)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

PostQueries.returnIfUserIsTaggedInPost = {
    query: `
    MATCH (n1:Post)
    WHERE n1.id = $postId
    WITH n1
    OPTIONAL MATCH (n1)-[r:TAGGED]->(n2:User)
    WHERE n2.recentFacebookAccessToken = $facebookAccessToken
    RETURN n2
    `,
    params: function (postId, facebookAccessToken) {
        return {
            postId: postId,
            facebookAccessToken: facebookAccessToken
        };
    }
};

PostQueries.uploadPost = {
    query: `
        MATCH (n1:User)
        WHERE n1.recentFacebookAccessToken = $facebookAccessToken
        WITH n1
        CREATE (n1)-[:UPLOADED]->(n2:Post{
            id: apoc.create.uuid() + ":" + n1.facebookId,
            imageUrl: $imageUrl,
            caption: $caption,
            timeSpentBeforePushingUploadInMilisecond: $timeSpentBeforePushingUploadInMilisecond,
            creationTime: datetime()
        })
        RETURN n2
        `,
    params: function (facebookAccessToken, imageUrl, caption, timeSpentBeforePushingUploadInMilisecond) {
        return {
            facebookAccessToken: facebookAccessToken,
            imageUrl: imageUrl,
            caption: caption,
            timeSpentBeforePushingUploadInMilisecond: timeSpentBeforePushingUploadInMilisecond
        };
    }
};

PostQueries.tagUsersToPost = {
    query: `
        MATCH (n1:Post)
        WHERE n1.id = $postId
        WITH n1
        UNWIND $tagUserIdsData AS tagUserId
        MATCH (n2:User) 
        WHERE n2.id = tagUserId
        WITH n1,n2
        CREATE (n1)-[:TAGGED{ 
            creationTime: datetime() 
        }]->(n2)
        RETURN n2
        `,
    params: function (postId, tagUserIdsData) {
        return {
            postId: postId,
            tagUserIdsData: tagUserIdsData
        };
    }
};

PostQueries.deleteUploadedPost = {
    query: `
        MATCH (n1:Post)
        WHERE n1.id = $postId
        WITH n1
        REMOVE n1:Post
        WITH n1
        SET n1:DeletedPost
        WITH n1
        SET n1.deletionTime = datetime()
        RETURN n1
        `,
    params: function (postId) {
        return {
            postId: postId
        };
    }
};


module.exports = PostQueries;