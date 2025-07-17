const { isValidObjectId } = require("mongoose");
const {
  GetDocs,
  CreateDoc,
  GetOneDoc,
  UpdateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const SupplierModel = require("./Supplier.model");
const ProductModel = require("../products/Product.model");
const CategoryModel = require("../categories/Category.model");

const GetSuppliers = async (req, res) => {
  try {
    const { city, category, status, sort } = req?.query;
    console.log({ city, category, status, sort });
    
    const suppliers = await SupplierModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: {
          path: "$categories",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          contact: { $first: "$contact" },
          category: { $first: "$categories.name" },
          status: { $first: "$status" },
          joinedAt: { $first: "$joinedAt" },
        },
      },
    ]);

    console.log("suppliers: ", suppliers);

    // If No Suppliers Found Return Error 400
    if (!suppliers)
      return res.status(400).json({ message: "No Suppliers Found" });

    return res.status(200).json(suppliers);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const GetSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    // Check If The Supplier ID is Valid
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supplier ID" });

    // Get Supplier Data
    const supplier = await GetOneDoc(SupplierModel, { _id: id });

    // Return Error If No Supplier Found
    if (!supplier)
      return res.status(400).json({ message: "Supplier Not Found" });

    // Get All Categories
    const categories = await GetDocs(CategoryModel);
    // Response With Supplier Data
    return res.status(200).json({ supplier, categories });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddSupplier = async (req, res) => {
  try {
    const { name, address, contact, categoryId, status } = req.body;
    console.log({ name, address, contact, categoryId, status });
    const supplier = await CreateDoc(SupplierModel, {
      name,
      address,
      contact,
      categoryId,
      status,
    });

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
  try {
    const { id } = req.params;
    const { name, address, contact, categoryId, status } = req.body;

    // Check If The Supplier ID is Valid
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supplier ID" });

    // Update Supplier
    const supplier = await UpdateDoc(SupplierModel, id, {
      name,
      address,
      contact,
      categoryId,
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
  try {
    const { id } = req.params;

    const supplier = await DeleteDoc(SupplierModel, id);

    if (!supplier)
      return res.status(400).json({ message: "Faild To Delete Supplier" });

    // Delete Supplier Products
    const deleteSupplierProducts = await ProductModel.deleteMany({
      supplierId: id,
    });

    if (!deleteSupplierProducts)
      return res.status(400).json({
        message: "Something Went Wront While Deleting Supplier Products",
      });

    return res.status(200).json({
      message: "Supplier With All It's Products Deleted Successfully",
    });
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
