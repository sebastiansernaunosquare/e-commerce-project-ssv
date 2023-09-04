const jwt = require("jsonwebtoken");
const config = require("../config/config.auth");
const pool = require("../queries/queries");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    pool.query(
      "SELECT * FROM public.tbl_user WHERE email=$1",
      [req.userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        const { role } = results.rows[0];
        if (role === 0) {
          return next();
        }

        return res.status(403).send({
          message: "User is not an Admin",
        });
      }
    );
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
