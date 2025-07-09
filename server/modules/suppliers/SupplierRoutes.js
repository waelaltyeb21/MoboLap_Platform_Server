const {
  GetSuppliers,
  GetSupplier,
  UpdateSupplier,
  DeleteSupplier,
  AddSupplier,
} = require("./SupplierController");

const SupplierRoutes = require("express").Router();

SupplierRoutes.get("/", GetSuppliers); // Auth
SupplierRoutes.get("/:id", GetSupplier); // Auth
SupplierRoutes.post("/create", AddSupplier); // Auth
SupplierRoutes.put("/update/:id", UpdateSupplier); // Auth
SupplierRoutes.delete("/delete/:id", DeleteSupplier); // Auth

module.exports = SupplierRoutes;
