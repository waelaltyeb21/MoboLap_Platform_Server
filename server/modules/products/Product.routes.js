const { upload } = require("../../services/UploadFiles");
const {
  GetProducts,
  AddProduct,
  UpdateProduct,
  GetProduct,
  DeleteProduct,
} = require("./Product.controller");

const ProductRoutes = require("express").Router();

ProductRoutes.get("/", GetProducts);
ProductRoutes.get("/:id", GetProduct);
ProductRoutes.post("/create", upload.single("product"), AddProduct); // Auth
ProductRoutes.put("/update/:id", upload.single("product"), UpdateProduct); // Auth
ProductRoutes.delete("/delete/:id", DeleteProduct); // Auth

module.exports = ProductRoutes;
