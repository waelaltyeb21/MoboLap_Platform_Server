const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const ErrorHandler = require("../middlewares/ErrorHandler");

// Routes
const SupplierRoutes = require("../modules/suppliers/SupplierRoutes");
const CategoryRoutes = require("../modules/categories/CategoryRoutes");
const ProductRoutes = require("../modules/products/ProductRoutes");

// Middlewares
app.use(express.json());

// Authentication & Authorization

// Error Handler
app.use(ErrorHandler);

// Statics Files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Endpoints
app.use("/suppliers", SupplierRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);

// Error 404 - Route Not Found
app.use((req, res, next) => {
  return res.status(404).json({ message: "Endpoint Not Found" });
});

app.listen(5000, () => {
  console.log("Server Is Running!");
});

module.exports = app;

// Connect To DATABASE
require("../config/ConnectDB");
