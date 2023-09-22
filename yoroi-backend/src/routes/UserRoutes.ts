import HttpStatusCodes from "@src/domain/constants/HttpStatusCodes";
import UserService from "@src/infrastructure/driven-adapters/services/UserService";
import { IUser } from "@src/domain/models/User";
import { IReq, IRes } from "./types/express/misc";

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

/**
 * @swagger
 * /users:
 *  get:
 *    summary: get all users
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
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json(users);
}

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
async function add(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

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
async function update(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

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
async function delete_(req: IReq, res: IRes) {
  const email = req.params.email;
  await UserService.delete(email);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
