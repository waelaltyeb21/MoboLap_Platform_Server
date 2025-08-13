const { isAuthenticated } = require("../../middlewares/Auth");
const { GetBlogs, GetBlog, AddBlog, DeleteBlog } = require("./Blog.controller");

const BlogRoutes = require("express").Router();

BlogRoutes.get("/", GetBlogs);
BlogRoutes.get("/:id", GetBlog);
BlogRoutes.post("/create", isAuthenticated, AddBlog);
BlogRoutes.delete("/delete/:id", isAuthenticated, DeleteBlog);

module.exports = BlogRoutes;
