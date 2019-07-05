const jwt = require('jsonwebtoken');
const config = require('../config');

const {findById} = require('../../db/queries/findUser');

const cookieTokenValidation = (req,res,next)=>{
      // check if client sent cookie
      const token = req.cookies.token;
      req.user={
          valid:false,
          error:{}
      }
      if (token === undefined){
          console.log('no token')
          req.user.error={
              name:'Authorisation Error',
              message:'You are not authorised'
          }
        // req.user.valid=true;
          next();
      } 
      else
      {
        // yes, cookie was already present 
        console.log('token exists', token);
        jwt.verify(token,config.secret , function(err, decoded) {
          if (err) {
            /*
              err = {
                name: 'JsonWebTokenError',
                message: 'jwt malformed'
              }
            */
           req.user.error=err
           console.log("Token Error",err)
           next();
          }
          findById(decoded.sub)
              .then(user=>{
                  req.user.valid=true;
                  next();
              })
              .catch(error=>{
                  req.user.valid=false;
                  req.user.error=error
                  console.log("Error in finding users by id",error);
                  next();
              })
        });
      } 
      // next(); // <-- important!
}

module.exports={
    cookieTokenValidation
}