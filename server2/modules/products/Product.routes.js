const { upload } = require("../../services/UploadFiles");
const {
  GetProducts,
  AddProduct,
  UpdateProduct,
  GetProduct,
  DeleteProduct,
  GetProductsByBrands,
} = require("./Product.controller");

const ProductRoutes = require("express").Router();

ProductRoutes.get("/", GetProducts);
ProductRoutes.get("/brands", GetProductsByBrands);
ProductRoutes.get("/:id", GetProduct);
ProductRoutes.post("/create", upload.array("ProductImages", 4), AddProduct); // Auth
ProductRoutes.put("/update/:id", upload.array("ProductImages", 4), UpdateProduct); // Auth
ProductRoutes.delete("/delete/:id", DeleteProduct); // Auth

module.exports = ProductRoutes;
