const enableAuth = require('../config/config').AUTHENABLED;

module.exports = {
    isAuth: function (req, res, next) {
        // Verifies That A User is Logged in if Authentication is enabled
        if (req.isAuthenticated() || !enableAuth) {
            return next();
        } else {
            res.status(401).send({msg: "You need to be logged in!"});
        }
    },
    NotAuth: function (req, res, next) {
        // Verifies That no User is Logged in if Authentication is enabled
        if (!req.isAuthenticated() || !enableAuth) {
            return next();
        }
        res.status(401).send({msg: "You are logged in!"});
    }
}