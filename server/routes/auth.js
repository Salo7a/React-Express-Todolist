const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/UserSchema")
const passport = require('passport');
const {isAuth, NotAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');



/* Register */
router.post('/register',[
  check('email').trim().isEmail().withMessage('Invalid Email').normalizeEmail(),
  check('password').isLength({min: 5}).withMessage('Password Must Be At Least 5 Chars Long')
],async function(req, res, next) {
    // Return error if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  // Get new user data
   let {name, email, password} = req.body
   try{
    // Generate temp id for testing
   let id = Math.floor(Math.random() * 1000000000) + 1
  //  Hash Password
   let hashedPass = bcrypt.hashSync(password, 10)
  // Check if email exists
  let user = await User.emailExist(email)
  if(user) return res.status(406).send({msg: "Email Already Exists"})
  //  Create new user
   let newuser = await User.create({
    id: id,
    password: hashedPass,
    name: name, 
    email: email
   })
   return res.status(201).send({msg: "Created"});
   } catch (err){
    console.error(err);
    res.status(501).send({msg: "Failed!"});
   }
});

/* Login */
router.post('/login', passport.authenticate('local'), function (req, res, next) {;
  if (!req.body.remember_me) {
      return next();
  }

  issueToken(req.user, function (err, token) {
      if (err) {
          return next(err);
      }
      res.cookie('remember_me', token, {path: '/', httpOnly: true, maxAge: 604800000});
      return next();
  });
},
function (req, res) {
  res.status(200).send({msg: "Logged In Successfully"});
});

/* Logout*/
router.get('/logout', isAuth, function (req, res, next) {
    req.logout(function(err) {
        if (err) { return res.status(500).send({msg: "Error"}); }
        res.status(200).send({msg: "Logged Out Successfully"});
    });

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
module.exports = router;
