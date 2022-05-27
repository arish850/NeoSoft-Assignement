const jwt = require('jsonwebtoken');
const config = require("../config");

let generateJWTForUser = (userData, ) => {
    let secret = config.jwt.Secret
    // console.log("user data",config.jwt,`${system}Secret`, secret);
    return jwt.sign({ _id: userData._id, highestCGRole: getHighestCgRole(userData.assignRole.slice()), faLevel: propertyOf('faLevelId.level', userData), reservingAuthorityLimit: propertyOf('faLevelId.reservingAuthorityLimit', userData), paymentAuthorityLimit: propertyOf('faLevelId.paymentAuthorityLimit', userData), role: userData.role, name: userData.name, ntidUserId: userData.ntidUserId, employeeName: userData.employeeName }, secret, config.jwt.options);
}

let decodeJWTForUser = (token) => {
    let secret = config.jwt.Secret
    console.log("checking the variable ----->", secret);
    return jwt.verify(token, secret);
}


module.exports = {
    generateJWTForUser,
    decodeJWTForUser
}
