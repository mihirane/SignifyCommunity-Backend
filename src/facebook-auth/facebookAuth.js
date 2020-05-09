const fetch = require('node-fetch');
const CryptoJS = require("crypto-js");
const _ = require("lodash");

function getAppSecretProof(accessToken, clientSecret){
    return CryptoJS.HmacSHA256(accessToken, clientSecret).toString(CryptoJS.enc.Hex);
}

function getDebugAccessTokenUrl(accessToken, appToken){
    return "https://graph.facebook.com/debug_token?input_token=" + accessToken + "&access_token=" + appToken;
}

function getAppTokenUrl(clientId, clientSecret){
    return "https://graph.facebook.com/oauth/access_token?client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=client_credentials";
}

function facebookAuth(clientId, clientSecret, accessToken, scope, createOrFindUserFunction) {
    return getAppToken(clientId, clientSecret)
        .then(appToken => {
            if (appToken) {
                return fetchAndStoreUserInfo(accessToken, appToken, getAppSecretProof(accessToken, clientSecret), scope, createOrFindUserFunction)
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function fetchAndStoreUserInfo(accessToken, appToken, appSecretProof, scope, createOrFindUserFunction) {
    return debugAccessToken(accessToken, appToken)
        .then(debugResponse => {
            if (debugResponse) {
                return fetch("https://graph.facebook.com/me?fields=" + convertScopeArrayToString(scope) + "&access_token=" + accessToken + "&appsecret_proof=" + appSecretProof)
                    .then(res => res.text())
                    .then(body => JSON.parse(body))
                    .then(async (response) => {
                        if (response) {
                            if (!response.error) {
                                await createOrFindUserFunction(response, debugResponse, accessToken);
                                return {
                                    "userData": response,
                                    "debugResponse": debugResponse,
                                    "accessToken": accessToken
                                };
                            }
                            else {
                                console.log(response.error.message);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function debugAccessToken(accessToken, appToken) {
    return fetch(getDebugAccessTokenUrl(accessToken, appToken))
        .then(res => res.text())
        .then(body => JSON.parse(body))
        .then(response => {
            if (!response.error && !response.data.error) {
                return response;
            }
            else {
                if (response.error) {
                    console.log(response.error.message);
                } else {
                    console.log(response.data.error.message);
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function getAppToken(clientId, clientSecret) {
    return fetch(getAppTokenUrl(clientId, clientSecret))
        .then(res => res.text())
        .then(body => JSON.parse(body))
        .then(response => {
            if (response.access_token) {
                return response.access_token;
            } else {
                console.log(response.error.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function convertScopeArrayToString(scope) {
    return _.join(scope, ",");
}

module.exports = facebookAuth;