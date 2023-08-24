var express = require("express");
var router = express.Router();
const pool = require("../queries/queries");

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
  debugger;
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

module.exports = router;
