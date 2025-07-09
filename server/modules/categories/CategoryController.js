const {
  GetDocs,
  GetOneDoc,
  CreateDoc,
  UpdateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const ProductModel = require("../products/ProductModel");
const CategoryModel = require("./CategoryModel");

const GetCategories = async (req, res) => {
  try {
    const categories = await GetDocs(CategoryModel);

    if (!categories)
      return res.status(400).json({ message: "No Category Found" });

    return res.status(200).json({
      message: `${categories?.length} Category Found`,
      categories: categories,
    });
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
    const { name, discount, isAvailable } = req.body;
    const category = await CreateDoc(CategoryModel, {
      name,
      discount,
      isAvailable,
    });

    if (!category)
      return res.status(400).json({ message: "Faild To Add New Category" });

    return res.status(201).json({ message: "New Category Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, discount, isAvailable } = req.body;
    const category = await UpdateDoc(CategoryModel, id, {
      name,
      discount,
      isAvailable,
    });

    if (!category)
      return res.status(400).json({ message: "Faild To Update Category" });

    return res.status(200).json({ message: "Category Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
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
