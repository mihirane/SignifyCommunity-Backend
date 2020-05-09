class DummyDataQueries {

    constructor(csvFilesPath) {
        this.csvFilesPath = csvFilesPath;
    }

    createDummyUsers() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Users.csv" AS dummyUser
        CREATE (n:User{
            id: dummyUser.id,
            recentFacebookAccessToken: dummyUser.recentFacebookAccessToken,
            facebookAccessTokenExpiresAtInMiliSeconds: dummyUser.facebookAccessTokenExpiresAtInMiliSeconds,
            facebookId: dummyUser.facebookId,
            email: dummyUser.email,
            firstName: dummyUser.firstName,
            lastName: dummyUser.lastName,
            profileImageUrl: dummyUser.profileImageUrl,
            gender: dummyUser.gender,
            about: dummyUser.about,
            accountCreationTime: datetime(),
            appSecretProof: dummyUser.appSecretProof,
            seqNo: dummyUser.seqNo
        })
        RETURN n
    `;
    }

    createDummyPosts() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Posts.csv" AS dummyPost
        MATCH (n1:User)
        WHERE n1.id = dummyPost.userId
        WITH n1,dummyPost
        CREATE (n2:Post{
            id: dummyPost.id,
            imageUrl: dummyPost.imageUrl,
            caption: dummyPost.caption,
            uploadTime: datetime(),
            timeSpentBeforePushingUploadInMilisecond: dummyPost.timeSpentBeforePushingUploadInMilisecond,
            seqNo: dummyPost.seqNo
        })
        WITH n1,n2,dummyPost
        CREATE (n1)-[:UPLOADED{ creationTime: datetime() }]->(n2)
        WITH n1,n2,dummyPost
        RETURN n2
    `;
    }

    createDummyTagsOfPost() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Posts.csv" AS dummyPost
        MATCH (n1:Post)
        WHERE n1.id = dummyPost.id
        WITH n1,dummyPost
        MATCH (n2:User)
        WHERE n2.id = dummyPost.tags
        WITH n1,n2
        CREATE (n1)-[:TAGGED{ creationTime: datetime() }]->(n2)
        RETURN n2
    `;
    }

    createDummyMoments() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Moments.csv" AS dummyMoment
        MATCH (n1:User)
        WHERE n1.id = dummyMoment.userId
        WITH n1,dummyMoment
        MATCH (n2:Post)
        WHERE n2.id = dummyMoment.postId
        WITH n1,n2,dummyMoment
        CREATE (n3:Moment{
            id: dummyMoment.id,
            imageUrl: dummyMoment.imageUrl,
            caption: dummyMoment.caption,
            timeSpentBeforePushingUploadInMilisecond: 1000,
            uploadTime: datetime(),
            seqNo: dummyMoment.seqNo
        })
        WITH n1,n2,n3,dummyMoment
        CREATE (n1)-[:ADDED{ creatimTime: datetime() }]->(n3)-[:TO{ creatimTime: datetime() }]->(n2)
        RETURN n3
    `;
    }

    createDummyComments() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Comments.csv" AS dummyComment
        MATCH (n1:User)
        WHERE n1.id = dummyComment.userId
        WITH n1,dummyComment
        MATCH (n2:Post)
        WHERE n2.id = dummyComment.postId
        WITH n1,n2,dummyComment
        CREATE (n3:Comment{
            id: dummyComment.id,
            text: dummyComment.text,
            timeTakenToCommentInMilisecond: 1000,
            uploadTime: datetime(),
            seqNo: dummyComment.seqNo
        })
        WITH n1,n2,n3,dummyComment
        CREATE (n1)-[:COMMENTED{ creatimTime: datetime() }]->(n3)-[:ON{ creatimTime: datetime() }]->(n2)
        RETURN n3
    `;
    }

    createDummyReplies() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/nodes/Replies.csv" AS dummyReply
        MATCH (n1:User)
        WHERE n1.id = dummyReply.userId
        WITH n1,dummyReply
        MATCH (n2:Comment)
        WHERE n2.id = dummyReply.commentId
        WITH n1,n2,dummyReply
        CREATE (n3:Reply{
            id: dummyReply.id,
            text: dummyReply.text,
            uploadTime: datetime(),
            seqNo: dummyReply.seqNo
        })
        WITH n1,n2,n3,dummyReply
        CREATE (n1)-[:REPLIED{ creatimTime: datetime() }]->(n3)-[:TO{ creatimTime: datetime() }]->(n2)
        RETURN n3
    `;
    }

    createDummySentFriendRequestRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/SentFriendRequestRelationships.csv" AS dummySentFriendRequestRelationship
    MATCH (n1:User)
    WHERE n1.id = dummySentFriendRequestRelationship.fromId
    WITH n1,dummySentFriendRequestRelationship
    MATCH (n2:User)
    WHERE n2.id = dummySentFriendRequestRelationship.toId
    WITH n1,n2,dummySentFriendRequestRelationship
    CREATE (n1)-[r:SENT_FRIEND_REQUEST{ 
        id: dummySentFriendRequestRelationship.id,
        seenSentFriendRequest: false,
        creationTime: datetime(),
        seqNo: dummySentFriendRequestRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyCancelledSentFriendRequestRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/CancelledSentFriendRequestRelationships.csv" AS dummyCancelledSentFriendRequestRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyCancelledSentFriendRequestRelationship.fromId
    WITH n1,dummyCancelledSentFriendRequestRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyCancelledSentFriendRequestRelationship.toId
    WITH n1,n2,dummyCancelledSentFriendRequestRelationship
    CREATE (n1)-[r:CANCELLED_SENT_FRIEND_REQUEST{ 
        id: dummyCancelledSentFriendRequestRelationship.id,
        seenSentFriendRequest: true,
        creationTime: datetime(),
        cancellatonTime: datetime(),
        seqNo: dummyCancelledSentFriendRequestRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyAcceptedFriendRequestRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/AcceptedFriendRequestRelationships.csv" AS dummyAcceptedFriendRequestRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyAcceptedFriendRequestRelationship.fromId
    WITH n1,dummyAcceptedFriendRequestRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyAcceptedFriendRequestRelationship.toId
    WITH n1,n2,dummyAcceptedFriendRequestRelationship
    CREATE (n1)-[r:ACCEPTED_FRIEND_REQUEST{ 
        id: dummyAcceptedFriendRequestRelationship.id,
        seenSentFriendRequest: true,
        seenAcceptedFriendRequest: false,
        creationTime: datetime(),
        acceptionTime: datetime(),
        seqNo: dummyAcceptedFriendRequestRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyDeclinedFriendRequestRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/DeclinedFriendRequestRelationships.csv" AS dummyDeclinedFriendRequestRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyDeclinedFriendRequestRelationship.fromId
    WITH n1,dummyDeclinedFriendRequestRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyDeclinedFriendRequestRelationship.toId
    WITH n1,n2,dummyDeclinedFriendRequestRelationship
    CREATE (n1)-[r:DECLINED_FRIEND_REQUEST{ 
        id: dummyDeclinedFriendRequestRelationship.id,
        seenSentFriendRequest: true,
        creationTime: datetime(),
        declinationTime: datetime(),
        seqNo: dummyDeclinedFriendRequestRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyUnfriendedRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/UnfriendedRelationships.csv" AS dummyUnfriendedRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyUnfriendedRelationship.fromId
    WITH n1,dummyUnfriendedRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyUnfriendedRelationship.toId
    WITH n1,n2,dummyUnfriendedRelationship
    CREATE (n1)-[r:UNFRIEND{ 
        id: dummyUnfriendedRelationship.id,
        creationTime: datetime(),
        seqNo: dummyUnfriendedRelationship.seqNo 
    }]->(n2)
    RETURN r
    `;
    }

    createDummyBlockedRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/BlockedRelationships.csv" AS dummyBlockedRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyBlockedRelationship.fromId
    WITH n1,dummyBlockedRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyBlockedRelationship.toId
    WITH n1,n2,dummyBlockedRelationship
    CREATE (n1)-[r:BLOCKED{ 
        id: dummyBlockedRelationship.id,
        creationTime: datetime(),
        seqNo: dummyBlockedRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyUnblockedRelationships() {
        return `
    LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/UnblockedRelationships.csv" AS dummyUnblockedRelationship
    MATCH (n1:User)
    WHERE n1.id = dummyUnblockedRelationship.fromId
    WITH n1,dummyUnblockedRelationship
    MATCH (n2:User)
    WHERE n2.id = dummyUnblockedRelationship.toId
    WITH n1,n2,dummyUnblockedRelationship
    CREATE (n1)-[r:UNBLOCKED{ 
        id: dummyUnblockedRelationship.id,
        creationTime: datetime(),
        unblockedTime: datetime(),
        seqNo: dummyUnblockedRelationship.seqNo
    }]->(n2)
    RETURN r
    `;
    }

    createDummyStarredRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/StarredRelationships.csv" AS dummyStarredRelationship
        MATCH (n1:Comment)
        WHERE n1.id = dummyStarredRelationship.id
        WITH n1,dummyStarredRelationship
        MATCH (n2:Post)<-[:ON]-(n1)
        WITH n1,n2,dummyStarredRelationship
        MATCH (n3)-[:UPLOADED]->(n2)
        WITH n1,n2,n3,dummyStarredRelationship
        CREATE (n3)-[:STARRED{ 
            id: dummyStarredRelationship.id,
            creationTime: datetime(),
            seqNo: dummyStarredRelationship.seqNo
        }]->(n1)
        RETURN n1
    `;
    }

    createDummyUnstarredRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/UnstarredRelationships.csv" AS dummyUnstarredRelationship
        MATCH (n1:Comment)
        WHERE n1.id = dummyUnstarredRelationship.id
        WITH n1,dummyUnstarredRelationship
        MATCH (n2:Post)<-[:ON]-(n1)
        WITH n1,n2,dummyUnstarredRelationship
        MATCH (n3)-[:UPLOADED]->(n2)
        WITH n1,n2,n3,dummyUnstarredRelationship
        CREATE (n3)-[:STARRED{ 
            id: dummyUnstarredRelationship.id,
            creationTime: datetime(),
            seqNo: dummyUnstarredRelationship.seqNo
        }]->(n1)
        RETURN n1
    `;
    }

    createDummyReportedPostRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/ReportedPostRelationships.csv" AS dummyReportedPostRelationship
        MATCH (n1:User)
        WHERE n1.id = dummyReportedPostRelationship.userId
        WITH n1,dummyReportedPostRelationship
        MATCH (n2:Post)
        WHERE n2.id = dummyReportedPostRelationship.reportingId
        WITH n1,n2,dummyReportedPostRelationship
        CREATE (n1)-[r:REPORTED{ 
            id: dummyReportedPostRelationship.id,
            reportText: dummyReportedPostRelationship.reportText,
            creationTime: datetime(),
            seqNo: dummyReportedPostRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummyReportedMomentRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/ReportedMomentRelationships.csv" AS dummyReportedMomentRelationship
        MATCH (n1:User)
        WHERE n1.id = dummyReportedMomentRelationship.userId
        WITH n1,dummyReportedMomentRelationship
        MATCH (n2:Moment)
        WHERE n2.id = dummyReportedMomentRelationship.reportingId
        WITH n1,n2,dummyReportedMomentRelationship
        CREATE (n1)-[r:REPORTED{ 
            id: dummyReportedMomentRelationship.id,
            reportText: dummyReportedMomentRelationship.reportText,
            creationTime: datetime(),
            seqNo: dummyReportedMomentRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummyReportedCommentRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/ReportedCommentRelationships.csv" AS dummyReportedCommentRelationship
        MATCH (n1:User)
        WHERE n1.id = dummyReportedCommentRelationship.userId
        WITH n1,dummyReportedCommentRelationship
        MATCH (n2:Comment)
        WHERE n2.id = dummyReportedCommentRelationship.reportingId
        WITH n1,n2,dummyReportedCommentRelationship
        CREATE (n1)-[r:REPORTED{ 
            id: dummyReportedCommentRelationship.id,
            reportText: dummyReportedCommentRelationship.reportText,
            creationTime: datetime(),
            seqNo: dummyReportedCommentRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummyReportedReplyRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/ReportedReplyRelationships.csv" AS dummyReportedReplyRelationship
        MATCH (n1:User)
        WHERE n1.id = dummyReportedReplyRelationship.userId
        WITH n1,dummyReportedReplyRelationship
        MATCH (n2:Reply)
        WHERE n2.id = dummyReportedReplyRelationship.reportingId
        WITH n1,n2,dummyReportedReplyRelationship
        CREATE (n1)-[r:REPORTED{ 
            id: dummyReportedReplyRelationship.id,
            reportText: dummyReportedReplyRelationship.reportText,
            creationTime: datetime(),
            seqNo: dummyReportedReplyRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummySeenPostRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/SeenPostRelationships.csv" AS dummySeenPostRelationship
        MATCH (n1:User)
        WHERE n1.id = dummySeenPostRelationship.userId
        WITH n1,dummySeenPostRelationship
        MATCH (n2:Post)
        WHERE n2.id = dummySeenPostRelationship.postId
        WITH n1,n2,dummySeenPostRelationship
        CREATE (n1)-[r:SEEN{ 
            id: dummySeenPostRelationship.id,
            creationTime: datetime(),
            seqNo: dummySeenPostRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummySeenMomentRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/SeenMomentRelationships.csv" AS dummySeenMomentRelationship
        MATCH (n1:User)
        WHERE n1.id = dummySeenMomentRelationship.userId
        WITH n1,dummySeenMomentRelationship
        MATCH (n2:Moment)
        WHERE n2.id = dummySeenMomentRelationship.momentId
        WITH n1,n2,dummySeenMomentRelationship
        CREATE (n1)-[r:SEEN{ 
            id: dummySeenMomentRelationship.id,
            creationTime: datetime(),
            seqNo: dummySeenMomentRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummySeenCommentRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/SeenCommentRelationships.csv" AS dummySeenCommentRelationship
        MATCH (n1:User)
        WHERE n1.id = dummySeenCommentRelationship.userId
        WITH n1,dummySeenCommentRelationship
        MATCH (n2:Comment)
        WHERE n2.id = dummySeenCommentRelationship.commentId
        WITH n1,n2,dummySeenCommentRelationship
        CREATE (n1)-[r:SEEN{ 
            id: dummySeenCommentRelationship.id,
            creationTime: datetime(),
            seqNo: dummySeenCommentRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    createDummySeenReplyRelationships() {
        return `
        LOAD CSV WITH HEADERS FROM "file:///SignifyDummyData/${this.csvFilesPath}/relationships/SeenReplyRelationships.csv" AS dummySeenReplyRelationship
        MATCH (n1:User)
        WHERE n1.id = dummySeenReplyRelationship.userId
        WITH n1,dummySeenReplyRelationship
        MATCH (n2:Reply)
        WHERE n2.id = dummySeenReplyRelationship.replyId
        WITH n1,n2,dummySeenReplyRelationship
        CREATE (n1)-[r:SEEN{ 
            id: dummySeenReplyRelationship.id,
            creationTime: datetime(),
            seqNo: dummySeenReplyRelationship.seqNo
        }]->(n2)
        RETURN r
    `;
    }

    deleteAllData() {
        return `
        MATCH (n)
        DETACH DELETE n
    `;
    }
}

module.exports = DummyDataQueries;