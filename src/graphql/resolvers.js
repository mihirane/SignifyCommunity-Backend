const resolvers = {

  UserInfo: {

    sentFriendRequests(parent, args, context, info){
      return sentFriendRequests(context.facebook_id, context.access_token);
    },

    receivedFriendRequests(parent, args, context, info){
      return receivedFriendRequests(context.facebook_id, context.access_token);
    },

    friends(parent, args, context, info){
      return friends(context.facebook_id, context.access_token);
    },

    blockedUsers(parent, args, context, info){
      return blockedUsers(context.facebook_id, context.access_token);
    }

  },

  User: {

    friends(parent, args, context, info){
      return friends(context.facebook_id, context.access_token);
    }

  },

  Post: {

    tags(parent, args, context, info) {
      return getTagsOfPost(parent.id);
    },

    comments(parent, args, context, info) {
      return getCommentsOnPost(parent.id);
    },

    moments(parent, args, context, info) {
      return getMomentsAddedToPost(parent.id);
    }

  },

  Moment: {

    uploader(parent, args, context, info) {
      return getMomentUploader(parent.id);
    }

  },

  Comment: {

    uploader(parent, args, context, info) {
      return getCommentUploader(parent.id);
    },

    replies(parent, args, context, info) {
      return getRepliesOfComment(parent.id);
    }

  },

  Reply: {

    uploader(parent, args, context, info) {
      return getReplyUploader(parent.id);
    }
    
  },

  Query: {
    
    UserInfo(parent, args, context, info) {
      return getCurrentUserInfo(context.facebook_id, context.access_token);
    },

    UploadedPosts(parent, args, context, info){
      return getUploadedPosts(context.facebook_id, context.access_token);
    },

    UploadedMoments(parent, args, context, info){
      return getAllAddedMoments(context.facebook_id, context.access_token);
    },

    UploadedComments(parent, args, context, info){
      return getAllComments(context.facebook_id, context.access_token);
    },

    StarredComments(parent, args, context, info){
      return getAllStarredComments(context.facebook_id, context.access_token);
    }

  }

};

module.exports = resolvers;