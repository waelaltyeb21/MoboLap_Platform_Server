const { isValidObjectId, default: mongoose } = require("mongoose");
const {
  GetDocs,
  GetOneDoc,
  CreateDoc,
  DeleteDoc,
  UpdateDoc,
} = require("../../lib/CrudOperations");
const BlogModel = require("./Blog.model");

const GetBlogs = async (req, res) => {
  try {
    const blogs = await GetDocs(BlogModel);
    console.log("Blogs: ", blogs);
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

    // const blog = await GetOneDoc(BlogModel, { _id: id });

    const [blog] = await BlogModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "supervisors",
          localField: "publishedBy",
          foreignField: "_id",
          as: "supervisors",
        },
      },
      {
        $unwind: {
          path: "$supervisors",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          likes: { $first: "$likes" },
          publishedBy: { $first: "$supervisors.name" },
          puplishedAt: { $first: "$puplishedAt" },
        },
      },
    ]);
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

const UpdateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Blog ID" });

    const User = req?.user;

    const blog = await UpdateDoc(BlogModel, id, {
      title,
      content,
      publishedBy: User.id,
    });

    if (!blog)
      return res.status(400).json({ message: "Faild To Add New Blog" });

    return res.status(200).json(blog);
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
  UpdateBlog,
  DeleteBlog,
};
