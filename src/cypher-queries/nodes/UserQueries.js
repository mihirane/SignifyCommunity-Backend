class UserQueries { }


UserQueries.returnIfUserExists = {
    query: `
    MATCH (n:User)
    WHERE n.id = $userId
    RETURN n
    `,
    params: function (userId) {
        return {
            userId: userId
        };
    }
};

UserQueries.getCurrentUserInfo = {
    query: `
    MATCH (n:User)
    WHERE n.recentFacebookAccessToken = $facebookAccessToken
    RETURN n
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

UserQueries.updateProfileImageOfUser = {
    query: `
    MATCH (n:User)
    WHERE n.recentFacebookAccessToken = $facebookAccessToken
    SET n.profileImageUrl = $profileImageUrl 
    RETURN n
    `,
    params: function (facebookAccessToken, profileImageUrl) {
        return {
            facebookAccessToken: facebookAccessToken,
            profileImageUrl: profileImageUrl
        };
    }
};

UserQueries.updateGenderOfUser = {
    query: `
    MATCH (n:User)
    WHERE n.recentFacebookAccessToken = $facebookAccessToken
    SET n.gender = $gender
    RETURN n
    `,
    params: function (facebookAccessToken, gender) {
        return {
            facebookAccessToken: facebookAccessToken,
            gender: gender
        };
    }
};

UserQueries.updateAboutOfUser = {
    query: `
    MATCH (n:User)
    WHERE n.recentFacebookAccessToken = $facebookAccessToken
    SET n.about = $about
    RETURN n
    `,
    params: function (facebookAccessToken, about) {
        return {
            facebookAccessToken: facebookAccessToken,
            about: about
        };
    }
};

UserQueries.returnRelationshipBetweenUsers = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $fromFacebookAccessToken
    WITH n1
    MATCH (n2:User)
    WHERE n2.id = $toId AND n1.id <> $toId
    WITH n1,n2
    OPTIONAL MATCH (n1)-[r]-(n2)
    WITH n1,r,n2
    RETURN type(r), startNode(r), endNode(r)
    `,
    params: function (fromFacebookAccessToken, toId) {
        return {
            fromFacebookAccessToken: fromFacebookAccessToken,
            toId: toId
        };
    }
};

UserQueries.deleteUser = {
    query: `
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    REMOVE n1:User
    WITH n1
    SET n1:DeletedUser
    WITH n1
    SET n1.accountDeletionTime = datetime()
    RETURN n1
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
};

UserQueries.getAllUsersExceptMe = {
    query:`
    MATCH (n1:User)
    WHERE n1.recentFacebookAccessToken = $facebookAccessToken
    WITH n1
    OPTIONAL MATCH (n2:User)
    WHERE n2.id <> n1.id
    RETURN n2
    ORDER BY n2.accountCreationTime DESC
    `,
    params: function (facebookAccessToken) {
        return {
            facebookAccessToken: facebookAccessToken
        };
    }
}

module.exports = UserQueries;