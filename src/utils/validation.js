const validator = require("validator");

const validateSignUpData = (req) => {
    
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password not strong");
  }
  //   else if (firstName.length < 4 || firstName.lenght < 50) {
  //     throw new Error("Firstname should be 4-50 lenght");
  //   }
};

module.exports = {
    validateSignUpData
};