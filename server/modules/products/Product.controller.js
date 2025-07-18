const { default: mongoose } = require("mongoose");
const {
  CreateDoc,
  UpdateDoc,
  DeleteDoc,
  GetDocs,
} = require("../../lib/CrudOperations");
const ProductModel = require("./Product.model");
const { isValidObjectId } = require("mongoose");
const { ResizeTheImage, DeleteFile } = require("../../services/UploadFiles");
const CategoryModel = require("../categories/Category.model");
const SupplierModel = require("../suppliers/Supplier.model");

const AddFiltersToRequest = ({
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
}) => {
  const filters = {};
  console.log("Category: ", isValidObjectId(category));
  if (category && category != "الكل" && isValidObjectId(category))
    filters["categoryId"] = new mongoose.Types.ObjectId(category);
  if (brand && brand != "الكل") filters["specs.brand"] = brand;
  if (screen && screen != "الكل") filters["specs.screen"] = screen;
  if (battery && battery != "الكل") filters["specs.battery"] = battery;
  if (ram && ram != "الكل") filters["specs.ram"] = ram;
  if (storage && storage != "الكل") filters["specs.storage"] = storage;
  if (model && model != "الكل") filters["specs.model"] = model;
  if (camera && camera != "الكل") filters["specs.camera"] = camera;
  if (fingerprint && fingerprint != "الكل")
    filters["specs.fingerprint"] = fingerprint;
  if (cpu && cpu != "الكل") filters["specs.cpu"] = cpu;
  if (gpu && gpu != "الكل") filters["specs.gpu"] = gpu;
  if (os && os != "الكل") filters["specs.os"] = os;
  console.log("Filters: ", filters);
  return { filters };
};

const GetProducts = async (req, res) => {
  const { sort } = req.query;
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  console.log("Queries: ", req.query);

  const { filters } = AddFiltersToRequest({ ...req.query });

  console.log("Filters: ", filters?.sort);
  try {
    const role = req?.user?.role || "admin";
    const products = await ProductModel.aggregate([
      {
        $match: {
          ...filters,
        },
      },
      {
        $sort: {
          createdAt: parseInt(sort) || 1,
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
    ]);

    if (!products) return res.status(400).json({ message: "No Product Found" });

    if (role === "user") return res.status(200).json(products);

    const categories = await GetDocs(CategoryModel);
    const brands = await ProductModel.distinct("specs.brand");

    return res.status(200).json({ products, categories, brands });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    // Extract Role
    const role = req?.user?.role || "admin";

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
        $unwind: {
          path: "$categories",
          preserveNullAndEmptyArrays: true,
        },
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
        $unwind: {
          path: "$suppliers",
          preserveNullAndEmptyArrays: true,
        },
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
          supplierId: { $first: "$supplierId" },
          categoryId: { $first: "$categoryId" },
          category: { $first: "$categories.name" },
          // Return Categories And Suppliers Only For The Dashboard
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);

    if (!product) return res.status(400).json({ message: "Product Not Found" });

    if (role === "user") return res.status(200).json(product);

    const categories = await GetDocs(CategoryModel);
    const suppliers = await GetDocs(SupplierModel);

    product.categories = categories;
    product.suppliers = suppliers;

    // For Supervisor
    return res.status(200).json(product);
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discount,
      specs,
      contents,
      supplierId,
      categoryId,
      isAvailable,
    } = req.body;

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No File Uploaded" });
    const { FileName } = await ResizeTheImage(file);

    const product = await CreateDoc(ProductModel, {
      name,
      price,
      discount,
      specs: JSON.parse(specs),
      image: FileName,
      contents,
      supplierId,
      categoryId,
      isAvailable,
    });

    if (!product)
      return res.status(400).json({ message: "Faild To Add New Product" });

    return res.status(201).json({ message: "New Product Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      discount,
      product: image,
      specs,
      contents,
      supplierId,
      categoryId,
      isAvailable,
    } = req.body;
    console.log("image: ", {
      name,
      price,
      discount,
      image,
      specs,
      contents,
      supplierId,
      categoryId,
      isAvailable,
    });
    // Extract Image If Found
    const file = req.file;
    let ProductImage;

    if (file) {
      const { FileName } = await ResizeTheImage(file);
      ProductImage = FileName;
    }

    const product = await UpdateDoc(ProductModel, id, {
      name,
      price,
      discount,
      specs: JSON.parse(specs),
      image: ProductImage,
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
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    const product = await DeleteDoc(ProductModel, id);

    if (!product)
      return res.status(400).json({ message: "Faild To Delete Product" });

    if (await DeleteFile(product.image))
      return res
        .status(400)
        .json({ message: "Faild To Delete The Product Image" });

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
