const jwt = require("jsonwebtoken");
const passport = require("passport");
const createUser = require("../../db/queries/createUser");
const { findByEmail } = require("../../db/queries/findUser");
const updateUser = require("../../db/queries/updateUser");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  // return jwt.encode({sub:user._id.toString(), iat:timestamp},config.secret)
  return jwt.sign(
    {
      sub: user._id.toString(),
      iat: timestamp,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 4
    },
    config.secret
  );
}

exports.signin = function({ email, password }, req) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (!user) {
        return reject(err.errmsg);
      }

      req.login(user, () => {
        let token = tokenForUser(user);
        req.res.cookie("token", token, {
          httpOnly: true
        });
        //update user is online
        return updateUser(user._id.toString(), { isOnline: true })
          .then(updated => {
            return resolve({
              email: user.email,
              _id: user._id.toString(),
              isOnline: user.isOnline,
              token
            });
          })
          .catch(err => reject("failed to update"));
      });
    })({ body: { email, password } });
  });
  // res.json({token:tokenForUser(req.user)})
};
