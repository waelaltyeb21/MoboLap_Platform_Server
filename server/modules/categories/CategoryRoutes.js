const { GetCategories, GetCategory, AddCategory, UpdateCategory, DeleteCategory } = require("./CategoryController");

const CategoryRoutes = require("express").Router();

CategoryRoutes.get("/", GetCategories);
CategoryRoutes.get("/:id", GetCategory);
CategoryRoutes.post("/create", AddCategory);
CategoryRoutes.put("/update/:id", UpdateCategory);
CategoryRoutes.delete("/delete/:id", DeleteCategory);

module.exports = CategoryRoutes;