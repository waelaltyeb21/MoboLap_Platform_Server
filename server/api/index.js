const express = require("express");
const app = express();
require("dotenv").config();
const ErrorHandler = require("../middlewares/ErrorHandler");

// Routes
const SupplierRoutes = require("../modules/suppliers/SupplierRoutes");
const CategoryRoutes = require("../modules/categories/CategoryRoutes");
const ProductRoutes = require("../modules/products/ProductRoutes");
const path = require("path");

// Middlewares
app.use(express.json());

// Authentication & Authorization

// Error Handler
app.use(ErrorHandler);

// Statics Files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error 404 - Route Not Found
app.get("/", async (req, res) => {
  res.status(404).json({ message: "Hello World" });
});

// Endpoints
app.use("/suppliers", SupplierRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);

app.listen(5000, () => {
  console.log("Server Is Running!");
});

module.exports = app;

// Connect To DATABASE
require("../config/ConnectDB");
