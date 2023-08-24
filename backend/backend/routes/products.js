var express = require("express");
var router = express.Router();
const pool = require("../queries/queries");

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Endpoints for the products
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - description
 *        - stock
 *        - price
 *        - productImageUrl
 *      properties:
 *        id:
 *          type: integer
 *          description: Unique id to create the product
 *        name:
 *          type: string
 *          description: Name for the product
 *        description:
 *          type: string
 *          description: Description for the product
 *        stock:
 *          type: integer
 *          description: Available units in stock
 *        price:
 *          type: integer
 *          description: The price for the product
 *        productImageUrl:
 *          type: string
 *          description: Image for the product
 *      example:
 *        id: 1
 *        name: T-shirt
 *        description: This is a t-shirt
 *        stock: 10
 *        price: 25
 *        productImageUrl: 'https://productimage.png'
 */

/* GET products listing */
/**
 * @swagger
 * /products:
 *  get:
 *    summary: Return all products
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: The list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get("/", function (req, res, next) {
  pool.query("SELECT * FROM public.tbl_product", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

/* POST list product by id */
/**
 * @swagger
 *  /product/{id}:
 *  post:
 *    summary: Find a product by id
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Product by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.post("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM public.tbl_product WHERE id=$1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
});

/* POST create a product. */
/**
 * @swagger
 *  /products:
 *  post:
 *    summary: Create a product
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: 'Product added with id: x'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      500:
 *        description: Server error
 */
router.post("/", function (req, res, next) {
  const { name, description, stock, price, productImageUrl } = req.body;
  pool.query(
    "INSERT INTO public.tbl_product(id, name, description, stock, price, product_image_url) VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING *",
    [name, description, stock, price, productImageUrl],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Product added with id: ${results.rows[0].id}`);
    }
  );
});

/* PUT update a product. */
/**
 * @swagger
 *  /products/{id}:
 *  put:
 *    summary: Update a product
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: 'Product updated with id: x'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Server error
 */
router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  const { name, description, stock, price, productImageUrl } = req.body;
  pool.query(
    "UPDATE public.tbl_product SET name=$1, description=$2, stock=$3, price=$4, product_image_url=$5 WHERE id=$6",
    [name, description, stock, price, productImageUrl, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Product updated with id: ${id}`);
    }
  );
});

/* DELETE delete a product. */
/**
 * @swagger
 *  /products/{id}:
 *  delete:
 *    summary: Deletes a product
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Product id
 *    responses:
 *      200:
 *        description: 'Product deleted with id: x'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Server error
 */
router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  pool.query(
    "DELETE FROM public.tbl_product WHERE id=$1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Product deleted with id: ${id}`);
    }
  );
});

module.exports = router;
