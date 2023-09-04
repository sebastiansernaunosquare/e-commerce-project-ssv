const pool = require("../queries/queries");

const checkDuplicateEmail = async (req, res, next) => {
  console.log("duplicateEmail");
  try {
    const { email } = req.body.email;
    pool.query(
      "SELECT * FROM public.tbl_user WHERE email=$1",
      [email],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log("rows", results.rows);
        if (results.rows[0]) {
          return res.status(400).send({
            message: "This email is already being used",
          });
        }
      }
    );
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate email!",
    });
  }
};

module.exports = checkDuplicateEmail;
