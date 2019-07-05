const createUser = require("../../db/queries/createUser");
const { findByEmail } = require("../../db/queries/findUser");

exports.signup = function(
  { userName, firstName, lastName, email, contactNo, dob, password },
  req
) {
  if (!email || !password) {
    console.log("error:Email or password cannot be empty");
    throw new Error("You must provide an email and password.");
  }

  return findByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        console.log("error:'Email is in use'");
        throw new Error("Email in use");
      }

      return createUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        contactNo: contactNo,
        dob:dob
      })
        .then(data => {
          return new Promise((resolve, reject) => {
            resolve(data);
          });
        })
        .catch(error => {
          throw new Error(error, "unexpected error");
        });
    })
    .catch(error => {
      throw new Error(error, "unexpected error");
    });
};
