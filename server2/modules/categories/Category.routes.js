const {
  GetCategories,
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory,
} = require("./Category.controller");

const CategoryRoutes = require("express").Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get All Categories
 *     responses:
 *       200:
 *         description: Return All Categories
 */

CategoryRoutes.get("/", GetCategories);
CategoryRoutes.get("/:id", GetCategory);
CategoryRoutes.post("/create", AddCategory); // Auth
CategoryRoutes.put("/update/:id", UpdateCategory); // Auth
CategoryRoutes.delete("/delete/:id", DeleteCategory); // Auth

module.exports = CategoryRoutes;
