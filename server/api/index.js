const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

// Import Middlewares
const ErrorHandler = require("../middlewares/ErrorHandler");
const limiter = require("../middlewares/RateLimiter");

// Routes
const SupplierRoutes = require("../modules/suppliers/SupplierRoutes");
const CategoryRoutes = require("../modules/categories/CategoryRoutes");
const ProductRoutes = require("../modules/products/ProductRoutes");
const SupervisorRoutes = require("../modules/supervisors/SupervisorRoutes");
const cookieParser = require("cookie-parser");
const { Encrypt } = require("../services/Encryption");
const AuthRoutes = require("../modules/auth/AuthRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(limiter);
app.use(cookieParser(process.env.COOKIES_SECRET));

// Authentication & Authorization

// Error Handler
app.use(ErrorHandler);

// Statics Files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Endpoints
app.use("/suppliers", SupplierRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);
app.use("/supervisors", SupervisorRoutes);
app.use("/auth", AuthRoutes);

app.get("/", async (req, res) => {
  const HashedPassword = await Encrypt("waelaltyeb");
  return res
    .status(200)
    .json({ message: "LogedIn Successfully", password: HashedPassword });
});

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
