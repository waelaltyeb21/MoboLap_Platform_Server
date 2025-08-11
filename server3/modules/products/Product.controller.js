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
  status,
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
  if (category && category != "الكل" && isValidObjectId(category))
    filters["categoryId"] = new mongoose.Types.ObjectId(category);
  if (brand && brand != "الكل") filters["specs.brand"] = brand;
  if (status && status != "الكل") filters["status"] = status;
  if (screen && screen != "الكل") filters["specs.screen"] = screen;
  if (battery && battery != "الكل") filters["specs.battery"] = battery;
  if (ram && ram != "الكل") filters["variants.ram"] = ram;
  if (storage && storage != "الكل") filters["variants.storage"] = storage;
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

  try {
    // const role = req?.user?.role;

    const products = await ProductModel.aggregate([
      {
        $match: {
          ...filters,
        },
      },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "categoryId",
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
          foreignField: "_id",
          localField: "supplierId",
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
        $addFields: {
          brand: "$specs.brand",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          brand: { $first: "$brand" },
          discount: { $first: "$discount" },
          images: { $first: "$images" },
          specs: { $first: "$specs" },
          variants: { $first: "$variants" },
          supplier: { $first: "$suppliers.name" },
          category: { $first: "$categories.name" },
          status: { $first: "$status" },
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
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

    // if (role !== "admin") return res.status(200).json(products);

    const categories = await GetDocs(CategoryModel);
    const brands = await ProductModel.distinct("specs.brand");

    return res.status(200).json({ products, categories, brands });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProductsByCategories = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const { brand, search, category } = req.query;

  const filters = {};
  if (category && category !== "all" && isValidObjectId(category))
    filters.categoryId = new mongoose.Types.ObjectId(category);
  if (search) filters.name = { $regex: search, $options: "i" };
  if (brand && brand != "all") filters["specs.brand"] = brand;

  try {
    const data = await ProductModel.aggregate([
      {
        $match: {
          ...filters,
        },
      },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "categoryId",
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
          brand: { $first: "$specs.brand" },
          categoryId: { $first: "$categoryId" },
          categoryName: { $first: "$categories.name" },
          discount: { $first: "$discount" },
          images: { $first: "$images" },
          specs: { $first: "$specs" },
          variants: { $first: "$variants" },
          status: { $first: "$status" },
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: {
          categoryName: 1,
          brand: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $group: {
          _id: {
            categoryId: "$categoryId",
            categoryName: "$categoryName",
            brand: "$brand",
          },
          products: { $push: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: {
            categoryId: "$_id.categoryId",
            categoryName: "$_id.categoryName",
          },
          brands: {
            $push: {
              brandName: "$_id.brand",
              products: "$products",
            },
          },
        },
      },
      {
        $project: {
          category: "$_id.categoryName",
          brands: {
            $map: {
              input: "$brands",
              as: "brand",
              in: {
                name: "$$brand.brandName",
                products: "$$brand.products",
              },
            },
          },
        },
      },
    ]);

    // if (!data || data.length === 0)
    //   return res.status(404).json({ message: "No Products Found" });

    const categories = await GetDocs(CategoryModel);
    const brands = await ProductModel.distinct("specs.brand");
    return res.status(200).json({
      data,
      categories,
      brands,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProductsByBrands = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const { brand, search, category, ids } = req.query;

  const IDs = ids.split("-") || [];
  const objectIds = IDs.map((id) => new mongoose.Types.ObjectId(id));

  console.log("IDs:", objectIds);
  console.log("Category:", category);
  console.log("Search:", search);
  console.log("brand:", brand);
  console.log("Queries: ", req.query);

  const filters = {};
  // if (objectIds) filters["_id"] = { $in: objectIds };
  if (category && isValidObjectId(category))
    filters.categoryId = new mongoose.Types.ObjectId(category);
  if (search) filters.name = { $regex: search, $options: "i" };
  if (brand) filters["specs.brand"] = brand;

  console.log("Filters: ", filters);
  try {
    const data = await ProductModel.aggregate([
      {
        $match: {
          ...filters,
        },
      },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "categoryId",
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
          foreignField: "_id",
          localField: "supplierId",
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
          brand: { $first: "$specs.brand" },
          discount: { $first: "$discount" },
          images: { $first: "$images" },
          specs: { $first: "$specs" },
          variants: { $first: "$variants" },
          supplier: { $first: "$suppliers.name" },
          category: { $first: "$categories.name" },
          status: { $first: "$status" },
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: {
          brand: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $group: {
          _id: "$brand",
          products: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 1,
          products: 1,
        },
      },
    ]);

    if (!data) return res.status(400).json({ message: "No Product Found" });

    // if (role !== "admin") return res.status(200).json(data);

    const categories = await GetDocs(CategoryModel);
    const brands = await ProductModel.distinct("specs.brand");

    return res.status(200).json({ data, categories, brands });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Cookies: ", req.cookies);

    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    // Extract Role
    const role = req?.user?.role;

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
          brand: { $first: "$specs.brand" },
          discount: { $first: "$discount" },
          specs: { $first: "$specs" },
          variants: { $first: "$variants" },
          images: { $first: "$images" },
          contents: { $first: "$contents" },
          supplierId: { $first: "$supplierId" },
          categoryId: { $first: "$categoryId" },
          category: { $first: "$categories.name" },
          // Return Categories And Suppliers Only For The Dashboard
          status: { $first: "$status" },
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);

    if (!product) return res.status(400).json({ message: "Product Not Found" });

    // if (role !== "admin") return res.status(200).json(product);

    const categories = await GetDocs(CategoryModel);
    const suppliers = await GetDocs(SupplierModel);
    const relatedProducts = await ProductModel.find({
      "specs.brand": product.specs.brand,
      _id: { $ne: product._id }, // exclude the current product
    }).limit(10);
    product.categories = categories;
    product.suppliers = suppliers;
    product.relatedProducts = relatedProducts;

    // For Supervisor
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      discount,
      specs,
      variants,
      contents,
      supplierId,
      categoryId,
      status,
      isAvailable,
    } = req.body;

    const imagePaths = req.files.map((file) => file);

    // If No Images Uploaded Found
    if (!req.files || req.files?.length === 0)
      return res.status(400).json({ message: "No Files Uploaded" });

    // Get The Images Names
    const ProductImages = await Promise.all(
      imagePaths.map(async (file) => {
        const { FileName } = await ResizeTheImage(file);
        return FileName;
      })
    );

    // Create New Product
    const product = await CreateDoc(ProductModel, {
      name,
      discount: Number(discount / 100),
      specs: JSON.parse(specs),
      variants: JSON.parse(variants),
      images: ProductImages,
      contents,
      supplierId,
      categoryId,
      status,
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
      discount,
      specs,
      variants,
      contents,
      supplierId,
      categoryId,
      status,
      isAvailable,
    } = req.body;

    // Extract Images If Found
    const imagePaths = req.files?.map((file) => file);

    let ProductImages;
    // If There Is Uploaded Images
    if (imagePaths.length !== 0) {
      const product = await ProductModel.findById(id);

      // Delete Old Ones
      // If the product has images
      if (product?.images?.length != 0) {
        product?.images?.map((image) => DeleteFile(image, "products"));
      }

      // Add The New Ones
      ProductImages = await Promise.all(
        imagePaths.map(async (file) => {
          const { FileName } = await ResizeTheImage(file);
          return FileName;
        })
      );
    }

    const product = await UpdateDoc(ProductModel, id, {
      name,
      discount: Number(discount < 1 ? discount : discount / 100),
      specs: JSON.parse(specs),
      variants: JSON.parse(variants),
      images: ProductImages,
      contents,
      supplierId,
      categoryId,
      status,
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

    // Delete The Product Images If Found
    if (product?.images?.length != 0)
      product?.images?.map((image) => DeleteFile(image, "products"));

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
  GetProductsByBrands,
  GetProductsByCategories,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
