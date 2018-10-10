const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const FacebookTokenStrategy = require('passport-facebook-token');


//social
//facebook
passport.use(new FacebookTokenStrategy({
    clientID: "234692480716354",
    clientSecret: "5dda9ccbf5be4653c55cf9286a7ad30f"
  }, function(accessToken, refreshToken, profile, done) {
    return User.findOne({facebookId: profile.id}, (err, user)=>{
        if(err) return done(err)
        if(user) return done(null, user)
        const u = new User({
            facebookId:profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value
        })
        u.save(err=>{
            if(err) return done(err)
            done(null, u)
        })
        
    }) //find

  } //cb
)); //strategy

module.exports = passport;