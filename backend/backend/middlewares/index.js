const authJwt = require("./authjwt");
const checkDuplicateEmail = require("./verify-signup");

module.exports = {
  authJwt,
  checkDuplicateEmail,
};
