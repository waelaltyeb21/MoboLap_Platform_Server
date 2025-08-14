const { isAuthenticated } = require("../../middlewares/Auth");
const {
  GetBlogs,
  GetBlog,
  AddBlog,
  DeleteBlog,
  UpdateBlog,
} = require("./Blog.controller");

const BlogRoutes = require("express").Router();

BlogRoutes.get("/", GetBlogs);
BlogRoutes.get("/:id", GetBlog);
BlogRoutes.post("/create", isAuthenticated, AddBlog);
BlogRoutes.put("/update/:id", isAuthenticated, UpdateBlog);
BlogRoutes.delete("/delete/:id", isAuthenticated, DeleteBlog);

module.exports = BlogRoutes;
