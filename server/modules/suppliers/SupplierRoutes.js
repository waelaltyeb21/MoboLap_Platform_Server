const {
  GetSuppliers,
  GetSupplier,
  UpdateSupplier,
  DeleteSupplier,
  AddSupplier,
} = require("./SupplierController");

const SupplierRoutes = require("express").Router();

SupplierRoutes.get("/", GetSuppliers);
SupplierRoutes.get("/:id", GetSupplier);
SupplierRoutes.post("/create", AddSupplier);
SupplierRoutes.put("/update/:id", UpdateSupplier);
SupplierRoutes.delete("/delete/:id", DeleteSupplier);

module.exports = SupplierRoutes;
