const csv = require("csvtojson");
const fs = require('fs');
const _ = require("lodash");


module.exports = async function (inputFilePath) {

    try {
        const dummyUsersData = await csv().fromFile(`./${inputFilePath}/nodes/Users.csv`);
        const dummyPostsData = await csv().fromFile(`./${inputFilePath}/nodes/Posts.csv`);
        const dummyMomentsData = await csv().fromFile(`./${inputFilePath}/nodes/Moments.csv`);
        const dummyCommentsData = await csv().fromFile(`./${inputFilePath}/nodes/Comments.csv`);
        const dummyRepliesData = await csv().fromFile(`./${inputFilePath}/nodes/Replies.csv`);

        const dummySentFriendRequestRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/SentFriendRequestRelationships.csv`);
        const dummyCancelledSentFriendRequestRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/CancelledSentFriendRequestRelationships.csv`);
        const dummyAcceptedFriendRequestRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/AcceptedFriendRequestRelationships.csv`);
        const dummyDeclinedFriendRequestRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/DeclinedFriendRequestRelationships.csv`);

        const dummyUnfriendedRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/UnfriendedRelationships.csv`);
        const dummyBlockedRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/BlockedRelationships.csv`);
        const dummyUnblockedRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/UnblockedRelationships.csv`);

        const dummyStarredRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/StarredRelationships.csv`);
        const dummyUnstarredRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/UnstarredRelationships.csv`);

        const dummyReportedPostRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/ReportedPostRelationships.csv`);
        const dummyReportedMomentRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/ReportedMomentRelationships.csv`);
        const dummyReportedCommentRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/ReportedCommentRelationships.csv`);
        const dummyReportedReplyRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/ReportedReplyRelationships.csv`);

        const dummySeenPostRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/SeenPostRelationships.csv`);
        const dummySeenMomentRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/SeenMomentRelationships.csv`);
        const dummySeenCommentRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/SeenCommentRelationships.csv`);
        const dummySeenReplyRelationshipsData = await csv().fromFile(`./${inputFilePath}/relationships/SeenReplyRelationships.csv`);

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            await _.forEach(dummyRepliesData, async function (dummyReply, index) {
                if (dummyReply.userId == dummyUser.id) {
                    dummyReply.uploader = await dummyUser;
                }
            });
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                if (dummyComment.userId == dummyUser.id) {
                    dummyComment.uploader = await dummyUser;
                }
            });
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            await _.forEach(dummyMomentsData, async function (dummyMoment, index) {
                if (dummyMoment.userId == dummyUser.id) {
                    dummyMoment.uploader = await dummyUser;
                }
            });
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            await _.forEach(dummyPostsData, async function (dummyPost, index) {
                if (dummyPost.userId == dummyUser.id) {
                    dummyPost.uploader = await dummyUser;
                }
            });
        });

        await _.forEach(dummyCommentsData, async function (dummyComment, index) {
            dummyComment.replies = await [];

            await _.forEach(dummyRepliesData, async function (dummyReply, index) {
                if (dummyReply.commentId == dummyComment.id) {
                    await dummyComment.replies.push(dummyReply);
                }
            });

            if (!dummyComment.replies[0]) {
                await dummyComment.replies.push(null);
            }
        });

        await _.forEach(dummyPostsData, async function (dummyPost, index) {
            dummyPost.moments = await [];

            await _.forEach(dummyMomentsData, async function (dummyMoment, index) {
                if (dummyMoment.postId == dummyPost.id) {
                    await dummyPost.moments.push(dummyMoment);
                }
            });

            if (!dummyPost.moments[0]) {
                await dummyPost.moments.push(null);
            }
        });

        await _.forEach(dummyPostsData, async function (dummyPost, index) {
            dummyPost.comments = await [];

            await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                if (dummyComment.postId == dummyPost.id) {
                    await dummyPost.comments.push(dummyComment);
                }
            });

            if (!dummyPost.comments[0]) {
                await dummyPost.comments.push(null);
            }
        });

        await _.forEach(dummyPostsData, async function (dummyPost, index) {
            dummyPost.tagsArray = await [];

            await _.forEach(dummyUsersData, async function (dummyUser, index) {
                if (dummyUser.id == dummyPost.tags) {
                    await dummyPost.tagsArray.push(dummyUser);
                }
            });

            if (!dummyPost.tagsArray[0]) {
                await dummyPost.tagsArray.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.sentFriendRequests = await [];

            await _.forEach(dummySentFriendRequestRelationshipsData, async function (dummySentFriendRequestRelationship, index) {
                if (dummySentFriendRequestRelationship.fromId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummySentFriendRequestRelationship.toId) {
                            await dummyUser.sentFriendRequests.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.sentFriendRequests[0]) {
                await dummyUser.sentFriendRequests.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.receivedFriendRequests = await [];

            await _.forEach(dummySentFriendRequestRelationshipsData, async function (dummySentFriendRequestRelationship, index) {
                if (dummySentFriendRequestRelationship.toId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummySentFriendRequestRelationship.fromId) {
                            await dummyUser.receivedFriendRequests.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.receivedFriendRequests[0]) {
                await dummyUser.receivedFriendRequests.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.friends = await [];

            await _.forEach(dummyAcceptedFriendRequestRelationshipsData, async function (dummyAcceptedFriendRequestRelationship, index) {
                if (dummyAcceptedFriendRequestRelationship.fromId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummyAcceptedFriendRequestRelationship.toId) {
                            await dummyUser.friends.push(dummyUser2);
                        }
                    });
                } else if (dummyAcceptedFriendRequestRelationship.toId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummyAcceptedFriendRequestRelationship.fromId) {
                            await dummyUser.friends.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.friends[0]) {
                await dummyUser.friends.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.unfriendedUsers = await [];

            await _.forEach(dummyUnfriendedRelationshipsData, async function (dummyUnfriendedRelationship, index) {
                if (dummyUnfriendedRelationship.fromId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummyUnfriendedRelationship.toId) {
                            await dummyUser.unfriendedUsers.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.unfriendedUsers[0]) {
                await dummyUser.unfriendedUsers.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.blockedUsers = await [];

            await _.forEach(dummyBlockedRelationshipsData, async function (dummyBlockedRelationship, index) {
                if (dummyBlockedRelationship.fromId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummyBlockedRelationship.toId) {
                            await dummyUser.blockedUsers.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.blockedUsers[0]) {
                await dummyUser.blockedUsers.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.unblockedUsers = await [];

            await _.forEach(dummyUnblockedRelationshipsData, async function (dummyUnblockedRelationship, index) {
                if (dummyUnblockedRelationship.fromId == dummyUser.id) {
                    await _.forEach(dummyUsersData, async function (dummyUser2, index) {
                        if (dummyUser2.id == dummyUnblockedRelationship.toId) {
                            await dummyUser.unblockedUsers.push(dummyUser2);
                        }
                    });
                }
            });

            if (!dummyUser.unblockedUsers[0]) {
                await dummyUser.unblockedUsers.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.posts = await [];

            await _.forEach(dummyPostsData, async function (dummyPost, index) {
                if (dummyPost.userId == dummyUser.id) {
                    await dummyUser.posts.push(dummyPost);
                }
            });

            if (!dummyUser.posts[0]) {
                await dummyUser.posts.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.moments = await [];

            await _.forEach(dummyMomentsData, async function (dummyMoment, index) {
                if (dummyMoment.userId == dummyUser.id) {
                    await dummyUser.moments.push(dummyMoment);
                }
            });

            if (!dummyUser.moments[0]) {
                await dummyUser.moments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.starredComments = await [];

            await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                await _.forEach(dummyStarredRelationshipsData, async function (dummyStarredRelationship, index) {
                    if (dummyStarredRelationship.id == dummyComment.id) {
                        if (dummyComment.userId == dummyUser.id) {
                            await dummyUser.starredComments.push(dummyComment);
                        }
                    }
                });
            });

            if (!dummyUser.starredComments[0]) {
                await dummyUser.starredComments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.comments = await [];

            await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                if (dummyComment.userId == dummyUser.id) {
                    await dummyUser.comments.push(dummyComment);
                }
            });

            if (!dummyUser.comments[0]) {
                await dummyUser.comments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.replies = await [];

            await _.forEach(dummyRepliesData, async function (dummyReply, index) {
                if (dummyReply.userId == dummyUser.id) {
                    await dummyUser.replies.push(dummyReply);
                }
            });

            if (!dummyUser.replies[0]) {
                await dummyUser.replies.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.reportedPosts = await [];

            await _.forEach(dummyReportedPostRelationshipsData, async function (dummyReportedPostRelationship, index) {
                await _.forEach(dummyPostsData, async function (dummyPost, index) {
                    if (dummyReportedPostRelationship.userId == dummyUser.id) {
                        if (dummyReportedPostRelationship.postId == dummyPost.id) {
                            await dummyUser.reportedPosts.push(dummyPost);
                        }
                    }
                });
            });

            if (!dummyUser.reportedPosts[0]) {
                await dummyUser.reportedPosts.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.reportedMoments = await [];

            await _.forEach(dummyReportedMomentRelationshipsData, async function (dummyReportedMomentRelationship, index) {
                await _.forEach(dummyMomentsData, async function (dummyMoment, index) {
                    if (dummyReportedMomentRelationship.userId == dummyUser.id) {
                        if (dummyReportedMomentRelationship.momentId == dummyMoment.id) {
                            await dummyUser.reportedMoments.push(dummyMoment);
                        }
                    }
                });
            });

            if (!dummyUser.reportedMoments[0]) {
                await dummyUser.reportedMoments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.reportedComments = await [];

            await _.forEach(dummyReportedCommentRelationshipsData, async function (dummyReportedCommentRelationship, index) {
                await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                    if (dummyReportedCommentRelationship.userId == dummyUser.id) {
                        if (dummyReportedCommentRelationship.commentId == dummyComment.id) {
                            await dummyUser.reportedComments.push(dummyComment);
                        }
                    }
                });
            });

            if (!dummyUser.reportedComments[0]) {
                await dummyUser.reportedComments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.reportedReplies = await [];

            await _.forEach(dummyReportedReplyRelationshipsData, async function (dummyReportedReplyRelationship, index) {
                await _.forEach(dummyRepliesData, async function (dummyReply, index) {
                    if (dummyReportedReplyRelationship.userId == dummyUser.id) {
                        if (dummyReportedReplyRelationship.replyId == dummyReply.id) {
                            await dummyUser.reportedReplies.push(dummyReply);
                        }
                    }
                });
            });

            if (!dummyUser.reportedReplies[0]) {
                await dummyUser.reportedReplies.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.seenPosts = await [];

            await _.forEach(dummySeenPostRelationshipsData, async function (dummySeenPostRelationship, index) {
                await _.forEach(dummyPostsData, async function (dummyPost, index) {
                    if (dummySeenPostRelationship.userId == dummyUser.id) {
                        if (dummySeenPostRelationship.postId == dummyPost.id) {
                            await dummyUser.seenPosts.push(dummyPost);
                        }
                    }
                });
            });

            if (!dummyUser.seenPosts[0]) {
                await dummyUser.seenPosts.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.seenMoments = await [];

            await _.forEach(dummySeenMomentRelationshipsData, async function (dummySeenMomentRelationship, index) {
                await _.forEach(dummyMomentsData, async function (dummyMoment, index) {
                    if (dummySeenMomentRelationship.userId == dummyUser.id) {
                        if (dummySeenMomentRelationship.momentId == dummyMoment.id) {
                            await dummyUser.seenMoments.push(dummyMoment);
                        }
                    }
                });
            });

            if (!dummyUser.seenMoments[0]) {
                await dummyUser.seenMoments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.seenComments = await [];

            await _.forEach(dummySeenCommentRelationshipsData, async function (dummySeenCommentRelationship, index) {
                await _.forEach(dummyCommentsData, async function (dummyComment, index) {
                    if (dummySeenCommentRelationship.userId == dummyUser.id) {
                        if (dummySeenCommentRelationship.commentId == dummyComment.id) {
                            await dummyUser.seenComments.push(dummyComment);
                        }
                    }
                });
            });

            if (!dummyUser.seenComments[0]) {
                await dummyUser.seenComments.push(null);
            }
        });

        await _.forEach(dummyUsersData, async function (dummyUser, index) {
            dummyUser.seenReplies = await [];

            await _.forEach(dummySeenReplyRelationshipsData, async function (dummySeenReplyRelationship, index) {
                await _.forEach(dummyRepliesData, async function (dummyReply, index) {
                    if (dummySeenReplyRelationship.userId == dummyUser.id) {
                        if (dummySeenReplyRelationship.replyId == dummyReply.id) {
                            await dummyUser.seenReplies.push(dummyReply);
                        }
                    }
                });
            });

            if (!dummyUser.seenReplies[0]) {
                await dummyUser.seenReplies.push(null);
            }
        });

        return {
            dummyUsersData: dummyUsersData,
            dummyPostsData: dummyPostsData,
            dummyMomentsData: dummyMomentsData,
            dummyCommentsData: dummyCommentsData,
            dummyRepliesData: dummyRepliesData,

            dummySentFriendRequestRelationshipsData: dummySentFriendRequestRelationshipsData,
            dummyCancelledSentFriendRequestRelationshipsData: dummyCancelledSentFriendRequestRelationshipsData,
            dummyAcceptedFriendRequestRelationshipsData: dummyAcceptedFriendRequestRelationshipsData,
            dummyDeclinedFriendRequestRelationshipsData: dummyDeclinedFriendRequestRelationshipsData,

            dummyUnfriendedRelationshipsData: dummyUnfriendedRelationshipsData,
            dummyBlockedRelationshipsData: dummyBlockedRelationshipsData,
            dummyUnblockedRelationshipsData: dummyUnblockedRelationshipsData,

            dummyStarredRelationshipsData: dummyStarredRelationshipsData,
            dummyUnstarredRelationshipsData: dummyUnstarredRelationshipsData,

            dummyReportedPostRelationshipsData: dummyReportedPostRelationshipsData,
            dummyReportedMomentRelationshipsData: dummyReportedMomentRelationshipsData,
            dummyReportedCommentRelationshipsData: dummyReportedCommentRelationshipsData,
            dummyReportedReplyRelationshipsData: dummyReportedReplyRelationshipsData,

            dummySeenPostRelationshipsData: dummySeenPostRelationshipsData,
            dummySeenMomentRelationshipsData: dummySeenMomentRelationshipsData,
            dummySeenCommentRelationshipsData: dummySeenCommentRelationshipsData,
            dummySeenReplyRelationshipsData: dummySeenReplyRelationshipsData
        };
    } catch (error) {
        console.log(error);
    }

};