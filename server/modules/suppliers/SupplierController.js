const { isValidObjectId } = require("mongoose");
const {
  GetDocs,
  CreateDoc,
  GetOneDoc,
  UpdateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const SupplierModel = require("./SupplierModel");
const ProductModel = require("../products/ProductModel");

const GetSuppliers = async (req, res) => {
  try {
    const suppliers = await GetDocs(SupplierModel);

    // If No Suppliers Found Return Error 400
    if (!suppliers)
      return res.status(400).json({ message: "No Suppliers Found" });

    return res.status(200).json({
      message: `${suppliers?.length} Supliers Found`,
      suppliers: suppliers,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const GetSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    // Check If The Supplier ID is Valid
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supplier ID" });

    // Get Supplier Data
    const supplier = await GetOneDoc(SupplierModel, { _id: id });

    // Return Error If No Supplier Found
    if (!supplier)
      return res.status(400).json({ message: "Supplier Not Found" });

    // Response With Supplier Data
    return res.status(200).json(supplier);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddSupplier = async (req, res) => {
  const { name, address, contact, status } = req.body;
  try {
    console.log({ name, address, contact, status });
    const supplier = await CreateDoc(SupplierModel, {
      name,
      address,
      contact,
      status,
    });

    console.log("supplier: ", supplier);
    if (!supplier)
      return res.status(400).json({ message: "Faild To Add New Supplier" });

    return res
      .status(201)
      .json({ message: "New Supplier Added Successfully", supplier: supplier });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact, status } = req.body;
  try {
    // Check If The Supplier ID is Valid
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supplier ID" });

    // Update Supplier
    const supplier = await UpdateDoc(SupplierModel, id, {
      name,
      address,
      contact,
      status,
    });

    // Return Error If Supplier Not Updated
    if (!supplier)
      return res.status(400).json({ message: "Faild To Update Supplier Data" });

    // Response With Message
    return res.status(200).json({ message: "Supplier Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await DeleteDoc(SupplierModel, id);

    if (!supplier)
      return res.status(400).json({ message: "Faild To Delete Supplier" });

    // Delete Supplier Products
    const deleteSupplierProducts = await ProductModel.findByIdAndDelete({
      supplierId: id,
    });

    if (!deleteSupplierProducts)
      return res.status(400).json({
        message: "Something Went Wront While Deleting Supplier Products",
      });

    return res.status(200).json({ message: "Supplier Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetSuppliers,
  GetSupplier,
  AddSupplier,
  UpdateSupplier,
  DeleteSupplier,
};
