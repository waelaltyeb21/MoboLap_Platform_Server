const {
  GetDocs,
  GetOneDoc,
  CreateDoc,
  UpdateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const ProductModel = require("../products/Product.model");
const CategoryModel = require("./Category.model");

const GetCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $addFields: {
          productsCount: { $size: "$products" },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          discount: { $first: "$discount" },
          brands: { $first: "$brands" },
          productsCount: { $first: "$productsCount" },
          isAvailable: { $first: "$isAvailable" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    if (!categories)
      return res.status(400).json({ message: "No Category Found" });

    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await GetOneDoc(CategoryModel, { _id: id });

    if (!category)
      return res.status(400).json({ message: "No Category Found" });

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddCategory = async (req, res) => {
  try {
    const { name, discount, brands, isAvailable } = req.body;
    const category = await CreateDoc(CategoryModel, {
      name,
      discount: parseInt(discount / 100),
      brands,
      isAvailable,
    });

    if (!category)
      return res.status(400).json({ message: "Faild To Add New Category" });

    return res.status(201).json({ message: "New Category Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, discount, brands, isAvailable } = req.body;

    const category = await UpdateDoc(CategoryModel, id, {
      name,
      discount,
      brands,
      isAvailable,
    });

    if (!category)
      return res.status(400).json({ message: "Faild To Update Category" });

    if (discount && discount != 1) {
      await ProductModel.updateMany({
        categoryId: id,
        discount: 1,
      });
    }

    return res.status(200).json({ message: "Category Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await DeleteDoc(CategoryModel, id);

    if (!category)
      return res.status(400).json({ message: "Faild To Delete Category" });

    // Delete Category Products
    const deleteCategoryProducts = await ProductModel.deleteMany({
      categoryId: id,
    });

    if (!deleteCategoryProducts)
      return res.status(400).json({
        message: "Something Went Wront While Deleting Category Products",
      });

    return res.status(200).json({
      message: "Category With All It's Products Has Been Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetCategories,
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory,
};
