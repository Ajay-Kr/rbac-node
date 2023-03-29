const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
  new LocalStrategy({
    // passReqToCallback: true, // if we use req in the function then required but we are not using thus not used
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({email});
      // Username/Email doesn't exist
      if(!user) {
        return done(null, false, {
          message: 'Username/email not registered'
        });
      }
      // Email exist and we need to verify the password
      const isMatch = await user.isValidPassword(password);
      return isMatch 
        ? done(null, user)  // when this occurs a session is established and a cookie is set in the browser with that session id. for transfering this to browser we need serialize and deserialize.
        : done(null, false, {message: 'Username/Password Incorrect'});

    } catch (error) {
      done(error);
    }
  })

);


// Serialize: for setting the userid inside the session 
//  the session will automatically create the cookie
//  and this is done behind the scenes by passport library
passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});

// Whenever a request comes from a browser it contains a cookie
//  From that cookie we find the session and if the session exist we call the done(err, user) fun 
// passport.deserializeUser(async function (id, done) {
passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});
