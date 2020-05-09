class MomentQueries { }


MomentQueries.returnIfMomentExists = {
    query: `
    OPTIONAL MATCH (n:Moment)
    WHERE n.id = $momentId
    RETURN n
    `,
    params: function (momentId) {
        return {
            momentId: momentId
        };
    }
};

MomentQueries.returnIfMomentIsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:ADDED]->(n2:Moment)
    WHERE n2.id = $momentId
    RETURN n2
    `,
    params: function (facebookAccessToken, momentId) {
        return {
            facebookAccessToken: facebookAccessToken,
            momentId: momentId
        };
    }
};

MomentQueries.hasUserAddedMomentToPost = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Post)
    WHERE n2.id = $ postId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[:ADDED]->(n3:Moment)-[:TO]->(n2)
    RETURN n3
    `,
    params: function (facebookAccessToken, postId) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId
        };
    }
};

MomentQueries.addMomentToPost = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    MATCH (n2:Post)
    WHERE n2.id = $ postId
    WITH n1,n2
    CREATE (n1)-[:ADDED]->(n3:Moment{
        id: apoc.create.uuid() + ":" + n1.facebookId,
        imageUrl: $imageUrl,
        caption: $caption,
        timeSpentBeforePushingUploadInMilisecond: $timeSpentBeforePushingUploadInMilisecond,
        creationTime: datetime()
    })-[:TO]->(n2)
    RETURN n3
    `,
    params: function (facebookAccessToken, postId, imageUrl, caption, timeSpentBeforePushingUploadInMilisecond) {
        return {
            facebookAccessToken: facebookAccessToken,
            postId: postId,
            imageUrl: imageUrl,
            caption: caption,
            timeSpentBeforePushingUploadInMilisecond: timeSpentBeforePushingUploadInMilisecond
        };
    }
};

MomentQueries.deleteMoment = {
    query: `
    MATCH (n1:Moment)
    WHERE n1.id = $momentId
    WITH n1
    REMOVE n1:Moment
    WITH n1
    SET n1:DeletedMoment
    WITH n1
    SET n1.deletionTime = datetime()
    RETURN n1
    `,
    params: function (momentId) {
        return {
            momentId: momentId
        };
    }
};

MomentQueries.deleteAllMomentsAddedToPost = {
    query: `
    MATCH (n1:Post)
    WHERE n1.id = $postId
    WITH n1
    OPTIONAL MATCH (n1)<-[:TO]-(n2:Moment)
    WITH n1,n2
    REMOVE n2:Moment
    WITH n1,n2
    SET n2:DeletedMoment
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

MomentQueries.getAllMomentsAddedToPost = {
    query: `
    MATCH (n1:Post)
    WHERE n1.id = $postId
    WITH n1
    OPTIONAL MATCH (n1)<-[:TO]-(n2:Moment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (postId) {
        return {
            postId: postId
        };
    }
};

MomentQueries.getAllMomentsUploadedByUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n1)-[:ADDED]->(n2:Moment)
    RETURN n2
    ORDER BY n2.creationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};


module.exports = MomentQueries;