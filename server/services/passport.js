const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStartegy = require('passport-local').Strategy;
const model = require('../../db/models/models');
const User = model.UsersModelClass;

//create local strategy
const localOptions= {usernameField:'email'}
const localLogin = new LocalStartegy(localOptions,function(email,password,done){
    //Verify this uername and password, call done with the user
    //if it is the correct username and password
    //otherwise, call done with false
    User.findOne({email:email},function(err,user){
        if(err) return done(err);
        if(!user) return done({errmsg:"Invalid Credetials"},false);
        
        //compare password - is'password' equal to user.password
        user.comparePassword(password,function(err,isMatch){
            if(err) return done(err);
            if(!isMatch) return done(null,false)

            return done(null,user)
        })
     })
});

//Setup options for JWT Startegy
const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.secret
};

//Create JWT Startegy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
    //See if the user ID in the payload exists in our database
    //If it does call 'done' with that other
    //otherwise, call done without user object
    console.log("Payload",payload)

    User.findById(payload.sub,function(err,user){
        if(err) return done(err,false);
        if(user) done(null,user);
        else done(null,false);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);