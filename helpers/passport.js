const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const FacebookTokenStrategy = require('passport-facebook-token');


//social
//facebook
passport.use(new FacebookTokenStrategy({
    clientID: "1865855136964814",
    clientSecret: "15500619d33f0d0900d44b95a01faced"
  }, function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId: profile.id})
    .then(user=>{
        if(user) return done(null, user)
        console.log(profile)
        const u = {
            facebookId:profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value
        }
        return User.create(u)
    })
    .then(user=>{
        done(null, user)
    })
    .catch(e=>done(e, null))
  }
));

module.exports = passport;