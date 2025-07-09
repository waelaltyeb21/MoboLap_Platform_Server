const { GetCategories, GetCategory, AddCategory, UpdateCategory, DeleteCategory } = require("./CategoryController");

const CategoryRoutes = require("express").Router();

CategoryRoutes.get("/", GetCategories);
CategoryRoutes.get("/:id", GetCategory);
CategoryRoutes.post("/create", AddCategory); // Auth
CategoryRoutes.put("/update/:id", UpdateCategory); // Auth
CategoryRoutes.delete("/delete/:id", DeleteCategory); // Auth

module.exports = CategoryRoutes;