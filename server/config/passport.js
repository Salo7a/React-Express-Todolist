const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Chance = require('chance');
const User = require('../models/UserSchema');

passport.use(new LocalStrategy({usernameField: 'email'}, async function (email, password, done) {
    let exists = await User.emailExist(email)
    if(!exists) return done(null, false, {message: 'Email is Not Registered'});
    let user = await User.findOne({email: email})
    if (user.comparePassword(password)) {
        user.LastLogin = new Date();
        user.save()
        return done(null, user, {message: 'Logged In Successfully'});
    }
    else{
        return done(null, false, {message: 'Wrong Password'});
    }
}

));

// serialize session, only store user id in the session information
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(async function (userId, done) {
    let user = await User.findOne({id: userId})
    if(user) {
        done(null, user)
    } else {
        done(err, null);
    };
});

function issueToken(user, done) {
    let chance = new Chance();
    let token = chance.word({length: 60});
    try {
        user.RememberHash = token
        user.save()
        return done(null, token);
    } catch (err){
        return done(err);
    }
}
