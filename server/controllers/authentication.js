const jwt = require('jsonwebtoken');
const passport = require('passport');
const createUser = require('../../db/queries/createUser')
const {findByEmail} = require('../../db/queries/findUser')
const updateUser  = require('../../db/queries/updateUser')
const config = require('../config');

function tokenForUser(user){
    const timestamp = Math.floor(new Date().getTime()/1000);
    // return jwt.encode({sub:user._id.toString(), iat:timestamp},config.secret)
    return jwt.sign({
        sub:user._id.toString(),iat:timestamp,exp:Math.floor(Date.now() / 1000) + (60 * 60)
      },config.secret)
}

exports.signin = function({email,password},req){
    return new Promise((resolve, reject) => {
        passport.authenticate('local',{session:false},(err, user) => {
          if (!user) { return reject(err.errmsg) }
    
          req.login(user, () =>{ 
            let token = tokenForUser(user);
            req.res.cookie('token',token,{
                httpOnly:true
            })
            //update user is online
              return updateUser(user._id.toString(),{isOnline:true})
                        .then((updated)=>{
                            return resolve({
                                email:user.email,
                                _id:user._id.toString(),
                                isOnline:user.isOnline,
                                token
                            })
                        })
                        .catch((err)=>reject('failed to update'))
              
            }
              );
        })({ body: { email, password } });
      });
    // res.json({token:tokenForUser(req.user)})
}
exports.signup = function({email,password},req){
    if(!email || !password){
        console.log("error:Email or password cannot be empty");
        throw new Error('You must provide an email and password.');
        // return res.status(422).send({error:'Email or password cannot be empty'})
    }

    return findByEmail(email)
            .then((existingUser)=>{
                if(existingUser){
                    console.log("error:'Email is in use'");
                    throw new Error('Email in use');
                    // res.status(422).send({error:'Email is in use'});
                }
        
                return createUser({email:email,password:password})
                        .then(data=>{
                            return new Promise((resolve, reject) => {
                                resolve(data);
                            });
                        })
                        .catch((error)=>{
                            throw new Error(error,'unexpected error')
                        })
            })
            .catch((error)=>{
                throw new Error(error,'unexpected error')
            })
    // Users.findOne({email:email},function(err,existingUser){
      
    //     // const user= new Users({
    //     //     email:email,
    //     //     password:password
    //     // })

    //     // user.save(function(err,user){
    //     //     if(err){return next(err)}
    //     //     res.json({token:tokenForUser(user)})
    //     // })
    // })
   
}