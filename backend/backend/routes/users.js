const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const pool = require("../queries/queries");
const { checkDuplicateEmail } = require("../middlewares");

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Endpoints for the users
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          description: Unique email to create the user
 *        password:
 *          type: string
 *          description: Password associated to the user
 *        role:
 *          type: integer
 *          description: Role for permissions
 *      example:
 *        email: user@mail.com
 *        password: xxxxxx
 *        role: 0
 */

/* GET users listing. */
/**
 * @swagger
 * /users:
 *  get:
 *    summary: Return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: The list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get("/", function (req, res, next) {
  pool.query("SELECT * FROM public.tbl_user", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

/* POST list user by id */
/**
 * @swagger
 *  /users/{email}:
 *  post:
 *    summary: Find a user by email
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User by email
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.post("/:email", function (req, res, next) {
  const email = req.params.email;
  pool.query(
    "SELECT * FROM public.tbl_user WHERE email=$1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
});

/* POST create an user. */
/**
 * @swagger
 *  /users:
 *  post:
 *    summary: Create an user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Server error
 */
router.post("/", function (req, res, next) {
  const { email, password, role } = req.body;
  pool.query(
    "INSERT INTO public.tbl_user(email, password, role) VALUES ($1, $2, $3) RETURNING *",
    [email, password, role],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with email: ${results.rows[0].email}`);
    }
  );
});

/* PUT update an user. */
/**
 * @swagger
 *  /users/{email}:
 *  put:
 *    summary: Update an user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: User email
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Server error
 */
router.put("/:email", function (req, res, next) {
  const email = req.params.email;
  const { password, role } = req.body;
  pool.query(
    "UPDATE public.tbl_user SET password=$1, role=$2 WHERE email=$3",
    [password, role, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User updated with email: ${email}`);
    }
  );
});

/* DELETE delete an user. */
/**
 * @swagger
 *  /users/{email}:
 *  delete:
 *    summary: Deletes an user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: User email
 *    responses:
 *      200:
 *        description: The user was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Server error
 */
router.delete("/:email", function (req, res, next) {
  const email = req.params.email;
  pool.query(
    `DELETE FROM public.tbl_user WHERE email=$1`,
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with email: ${email}`);
    }
  );
});

/* POST create an user and signup. */
/**
 * @swagger
 *  /users/signup:
 *  post:
 *    summary: Create an user and sign up
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Account creation succesful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Server error
 */
router.post("/signup", function (req, res, next) {
  console.log("sign up dude!");
  try {
    const { email, password, role } = req.body;
    const encryptedPassword = bcrypt.hashSync(password);
    pool.query(
      "INSERT INTO public.tbl_user(email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, encryptedPassword, role],
      (error, results) => {
        if (error) {
          throw error;
        }
        res
          .status(201)
          .send(`Account creation succesful: ${results.rows[0].email}`);
      }
    );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* POST create an user and signup. */
/**
 * @swagger
 *  /users/login:
 *  post:
 *    summary: Log in a user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Token set
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Server error
 */
router.post("/login", function (req, res, next) {
  try {
    const { email, password } = req.body;
    pool.query(
      "SELECT * FROM public.tbl_user WHERE email = $1",
      [email],
      (error, results) => {
        if (error) {
          throw error;
        }

        const user = results.rows[0];
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

        req.session.token = token;
        return res.status(200).send({
          email: user.email,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

/* POST log out an user. */
/**
 * @swagger
 *  /users/logout:
 *  post:
 *    summary:
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: You've been signed out
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Server error
 */
router.post("/logout", function (req, res, next) {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
});

module.exports = router;
