const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
  clientID : "519078855010-pr7kq9v1k3ic4o4f29on59foepkkvam1.apps.googleusercontent.com",
  clientSecret : "N1PuP3UrhYfjzr1ADvh9x8Jx",
  callbackURL : "http://localhost:8000/users/auth/google/callback"
  },

  function(accessToken ,refreshToken , profile , done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){

      if(err){console.log("error in google strategy passport",err); return;}

      console.log(profile);

      if(user){
        return done(null,user);
      }else{
        User.create({
          name:profile.displayName,
          email:profile.emails[0].value,
          password:crypto.randomBytes(20).toString('hex')
        },function(err,user){
          if(err){console.log("error in creating user",err); return;} 

          return done(null,user);
        });
      }

    });
  }

));

module.exports = passport ;