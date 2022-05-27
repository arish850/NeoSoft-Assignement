let utils = require('./utils/utils');

let isUserLogin = (req, res, next) => {
    let token = req.headers['auth'];
    if (token) {
        let decodedData;
        try {
            decodedData = utils.decodeJWTForUser(token);
        } catch (err) {
            res.status(401).json({ status: false, message: "Invalid token", data: null });
            return;
        }
        req.jwt = decodedData;
        next();
    } else {
        res.status(401).json({ status: false, message: "User token not found", data: null });
    }
}

module.exports = {
    isUserLogin
}
