const facebookAuth = require("./facebookAuth.js");
const CryptoJS = require("crypto-js");

function getAppSecretProof(accessToken, clientSecret) {
    return CryptoJS.HmacSHA256(accessToken, clientSecret).toString(CryptoJS.enc.Hex);
}

const facebookAuthCallback = function (clientId, clientSecret, scope, createOrFindUser) {
    return function (req, res, next) {
        if (req.headers.access_token) {
            facebookAuth(
                clientId,
                clientSecret,
                req.headers.access_token,
                scope,
                createOrFindUser
            ).then(response => {
                if (response) {
                    res.cookie('access_token', response.accessToken, {
                        httpOnly: true,
                        expires: new Date(response.debugResponse.data.expires_at * 1000)
                    });

                    res.cookie('facebook_id', response.userData.id, {
                        httpOnly: true,
                        expires: new Date(response.debugResponse.data.expires_at * 1000)
                    });

                    res.send({ "data": "Access Token Validated Successfully" });

                } else {
                    res.send({ "error": "Invalid Access Token Provided" });
                }
            }).catch(error => {
                console.log(error);
                res.send(error);
            });
        } else {
            res.send({ "error": "No AccessToken Provided" });
        }
    }
}

const facebookAuthProtectRoute = function () {
    return function (req, res, next) {
        if (req.cookies.access_token && req.cookies.facebook_id) {
            next();
        } else {
            res.send({ "error": "Unauthorized Request" });
        }
    }
}

const facebookAuthProtectRouteWithAppSecretProof = function (clientSecret) {
    return function (req, res, next) {
        if (req.cookies.facebook_id) {
            if (req.cookies.access_token) {
                if (req.headers.app_secret_proof) {
                    if (req.headers.app_secret_proof == getAppSecretProof(req.cookies.access_token, clientSecret)) {
                        next();
                    } else {
                        console.log("Invalid App Secret Proof Provided");
                        res.send({ "error": "Invalid App Secret Proof Provided" });
                    }
                } else {
                    console.log("No App Secret Proof Provided");
                    res.send({ "error": "No App Secret Proof Provided" });
                }
            } else {
                console.log("No Access Token Provided");
                res.send({ "error": "No Access Token Provided" });
            }
        } else {
            console.log("No Facebook Id of User Provided");
            res.send({ "error": "No Facebook Id of User Provided" });
        }
    }
}

module.exports = {
    facebookAuthCallback, facebookAuthCallback,
    facebookAuthProtectRoute: facebookAuthProtectRoute,
    facebookAuthProtectRouteWithAppSecretProof: facebookAuthProtectRouteWithAppSecretProof
}