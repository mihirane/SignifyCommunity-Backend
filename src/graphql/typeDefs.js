const { gql } = require("apollo-server");

const typeDefs = gql`

enum Gender{
  NOT_SPECIFIED
  MALE
  FEMALE
  OTHER
}

type UserInfo{
  id: String!
  facebookId: String!
  firstName: String!
  lastName: String!
  profileImageUrl: String
  gender: String
  about: String
  email: String!
  sentFriendRequests: [User]
  receivedFriendRequests: [User]
  friends: [User]
  blockedUsers: [User]
}

type User{
  id: String!
  facebookId: String!
  firstName: String!
  lastName: String!
  profileImageUrl: String
  gender: String
  about: String
  friends: [User]
}

type Post{
  id: String!
  imageUrl: String!
  caption: String
  tags: [User]
  comments: [Comment]
  moments: [Moment]
  uploadTime: String!
  uploader: User!
}

type Moment{
  id: String!
  imageUrl: String!
  caption: String
  uploadTime: String!
  uploader: User!
}

type Comment{
  id: String!
  text: String!
  replies: [Reply]
  uploadTime: String!
  uploader: User!
}

type Reply{
  id: String!
  text: String!
  uploadTime: String!
  uploader: User!
}

type Query{
  UserInfo: UserInfo!
  UploadedPosts: [Post]
  UploadedMoments: [Moment]
  UploadedComments: [Comment]
  StarredComments: [Comment]
  Users: [User]
}

`;

module.exports = typeDefs;