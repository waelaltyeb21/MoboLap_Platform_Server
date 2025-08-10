const { isAuthenticated } = require("../../middlewares/Auth");
const { upload } = require("../../services/UploadFiles");
const {
  GetCategories,
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory,
} = require("./Category.controller");

const CategoryRoutes = require("express").Router();

CategoryRoutes.get("/", GetCategories);
CategoryRoutes.get("/:id", GetCategory);
CategoryRoutes.post(
  "/create",
  upload.single("category"),
  isAuthenticated,
  AddCategory
); // Auth
CategoryRoutes.put(
  "/update/:id",
  upload.single("category"),
  isAuthenticated,
  UpdateCategory
); // Auth
CategoryRoutes.delete("/delete/:id", isAuthenticated, DeleteCategory); // Auth

module.exports = CategoryRoutes;
