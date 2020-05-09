const PropetiesCategories = {

    User: [
        "id",
        "facebookId",
        "firstName",
        "lastName",
        "profileImageUrl",
        "gender",
        "about"
    ],

    UserHidden: [
        "email",
        "recentFacebookAccessToken",
        "facebookAccessTokenExpiresAtInMiliSeconds",
        "appSecretProof"
    ],

    UserRelationships: [
        "sentFriendRequests",
        "receivedFriendRequests",
        "friends",
        "blockedUsers"
    ],

    Friends: [
        "friends"
    ],

    Post: [
        "imageUrl",
        "caption",
        "timeSpentBeforePushingUploadInMilisecond"
    ],

    PostSubContent: [
        "tags",
        "moments",
        "comments"
    ],

    Moment: [
        "imageUrl",
        "caption"
    ],

    Comment: [
        "text",
    ],

    CommentSubContent: [
        "replies"
    ],

    Reply: [
        "text"
    ],

    Uploader: [
        "uploader"
    ],

    ID: [
        "id"
    ],

    PostID: [
        "postId"
    ],

    SentFriendRequest: [

    ],

    CancelledSentFriendRequest: [

    ],

    AcceptedFriendRequest: [

    ],

    DeclinedFriendRequest: [

    ],

    Unfriended: [

    ],

    Blocked: [

    ],

    Unblocked: [

    ],

    Reported: [
        "reportText"
    ],

    Seen: [

    ],

    SeqNo: [
        "seqNo"
    ]

};

module.exports = PropetiesCategories;