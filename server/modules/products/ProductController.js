const { default: mongoose } = require("mongoose");
const { CreateDoc, UpdateDoc, DeleteDoc } = require("../../lib/CrudOperations");
const ProductModel = require("./ProductModel");
const { isValidObjectId } = require("mongoose");

const GetProducts = async (req, res) => {
  const {
    category,
    brand,
    screen,
    battery,
    ram,
    storage,
    model,
    camera,
    fingerprint,
    cpu,
    gpu,
    os,
  } = req.query;
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const specs = {};
  if (screen) specs.screen = parseFloat(screen);

  //   if (category != "") filters.specs.category = category;
  //   if (brand != "") filters.specs.brand = brand;
  //   if (screen != "") filters.specs.screen = screen;
  //   if (battery != "") filters.specs.battery = battery;
  //   if (ram != "") filters.specs.ram = ram;
  //   if (storage != "") filters.specs.storage = storage;
  //   if (model != "") filters.specs.model = model;
  //   if (camera != "") filters.specs.camera = camera;
  //   if (fingerprint != "") filters.specs.fingerprint = fingerprint;
  //   if (cpu != "") filters.specs.cpu = cpu;
  //   if (gpu != "") filters.specs.gpu = gpu;
  //   if (os != "") filters.specs.os = os;

  console.log("Specs: ", specs);
  try {
    const role = req?.user?.role || "user";
    const products = await ProductModel.aggregate([
      {
        $match: {
          ...specs,
        },
      },
      {
        $sort: { joinedAt: -1 },
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
    ]);

    if (!products) return res.status(400).json({ message: "No Product Found" });

    if (role === "user")
      return res.status(200).json({
        specs: specs,
        message: "Response For Normal User / Guest",
        products: products,
      });

    return res.status(200).json({
      specs: specs,
      message: "Response For Supervisor",
      products: products,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    // Extract Role
    const role = req?.user?.role || "user";

    const [product] = await ProductModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $lookup: {
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "suppliers",
        },
      },
      {
        $unwind: "$suppliers",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          price: { $first: "$price" },
          discount: { $first: "$discount" },
          specs: { $first: "$specs" },
          image: { $first: "$image" },
          contents: { $first: "$contents" },
          supplier: { $first: role === "user" ? "MoboLap" : "$suppliers.name" },
          category: { $first: "$categories.name" },

          // Return Categories And Suppliers Only For The Dashboard
          ...(role === "user"
            ? null
            : { categories: { $first: "$categories" } }),
          ...(role === "user" ? null : { suppliers: { $first: "$suppliers" } }),
        },
      },
    ]);

    if (!product) return res.status(400).json({ message: "Product Not Found" });

    if (role === "user") return res.status(200).json(product);

    // For Supervisor
    return res.status(200).json(product);
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddProduct = async (req, res) => {
  const {
    name,
    price,
    discount,
    specs,
    image,
    contents,
    supplierId,
    categoryId,
    isAvailable,
  } = req.body;
  const file = req.file;
  try {
    console.log("File: ", file);
    const product = await CreateDoc(ProductModel, {
      name,
      price,
      discount,
      specs,
      image: file?.originalname || "Not_Set",
      contents,
      supplierId,
      categoryId,
      isAvailable,
    });

    if (!product)
      return res.status(400).json({ message: "Faild To Add New Product" });

    return res.status(201).json({ message: "New Product Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    discount,
    specs,
    image,
    contents,
    supplierId,
    categoryId,
    isAvailable,
  } = req.body;
  try {
    const product = await UpdateDoc(ProductModel, id, {
      name,
      price,
      discount,
      specs,
      image,
      contents,
      supplierId,
      categoryId,
      isAvailable,
    });

    if (!product)
      return res.status(400).json({ message: "Faild To Update Product" });

    return res.status(200).json({ message: "Product Updated Successfully" });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    const product = await DeleteDoc(ProductModel, id);

    if (!product)
      return res.status(400).json({ message: "Faild To Delete Product" });

    return res
      .status(200)
      .json({ message: "Product Has Been Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetProducts,
  GetProduct,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
