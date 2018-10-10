const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy


//social
//facebook
passport.use(new FacebookTokenStrategy({
    clientID: "234692480716354",
    clientSecret: "5dda9ccbf5be4653c55cf9286a7ad30f"
  }, function(accessToken, refreshToken, profile, done) {
      console.log(profile)
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

//Gmail
passport.use(new GoogleTokenStrategy({
    clientID: "87733822528-o04ehqt2iv4h477a57qb4840vc4p2bs4.apps.googleusercontent.com",
    clientSecret: "rI8lTZHer_f4SGaSc2SjHoto"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("google profile: ", profile)
    return User.findOne({googleId: profile.id}, (err, user)=>{
        if(err) return done(err)
        if(user) return done(null, user)
//        console.log(profile)
        const u = new User({
            googleId:profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile._json.picture
        })
        u.save(err=>{
            if(err) return done(err)
            done(null, u)
        })
        
    }) //find
  }
)); //strategy

module.exports = passport;