const { isValidObjectId } = require("mongoose");
const {
  GetDocs,
  GetOneDoc,
  CreateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const BlogModel = require("./Blog.model");

const GetBlogs = async (req, res) => {
  try {
    const blogs = await GetDocs(BlogModel);
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Blog ID" });

    const blog = await GetOneDoc(BlogModel, { _id: id });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const User = req?.user;
    const blog = await CreateDoc(BlogModel, {
      title,
      content,
      publishedBy: User.id,
    });

    if (!blog)
      return res.status(400).json({ message: "Faild To Add New Blog" });

    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Blog ID" });

    const blog = await DeleteDoc(BlogModel, id);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetBlogs,
  GetBlog,
  AddBlog,
  DeleteBlog,
};
