const enableAuth =  require('../config/config').AUTHENABLED;

module.exports = {
    isAuth: function (req, res, next) {
        if (req.isAuthenticated() || !enableAuth) {
                return next();
        } else {
            res.status(401).send({msg: "You need to be logged in!"});
        }
    },
    NotAuth: function (req, res, next) {
        if (!req.isAuthenticated() || !enableAuth ) {
            return next();
        }
        res.status(401).send({msg: "You are logged in!"});
    }
}