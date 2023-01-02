const createError = require("http-errors");

module.exports = {
    isAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.session.returnTo) {
                res.redirect(req.session.returnTo);
                delete req.session.returnTo;
            } else {
                return next();
            }
        } else {
            if (req.originalUrl !== '/auth/logout' && req.originalUrl !== '/auth/login') {
                req.session.returnTo = req.originalUrl || req.url;
            } else {
                req.session.returnTo = "/"
            }
            res.redirect('/auth/login');
        }
    },
    NotAuth: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}