const upload = require("../../services/UploadFiles");
const {
  GetProducts,
  AddProduct,
  UpdateProduct,
  GetProduct,
  DeleteProduct,
} = require("./ProductController");

const ProductRoutes = require("express").Router();

ProductRoutes.get("/", GetProducts);
ProductRoutes.get("/:id", GetProduct);
ProductRoutes.post("/create", upload.single("product"), AddProduct);
ProductRoutes.put("/update/:id", UpdateProduct);
ProductRoutes.delete("/delete/:id", DeleteProduct);

module.exports = ProductRoutes;
