const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");

// Import Middlewares
const cookieParser = require("cookie-parser");
const ErrorHandler = require("../middlewares/ErrorHandler");

// Routes
const SupplierRoutes = require("../modules/suppliers/Supplier.routes");
const CategoryRoutes = require("../modules/categories/Category.routes");
const ProductRoutes = require("../modules/products/Product.routes");
const SupervisorRoutes = require("../modules/supervisors/Supervisor.routes");
const AuthRoutes = require("../modules/auth/Auth.routes");

// Services
const { isAuthenticated } = require("../middlewares/Auth");
const { GetDocs } = require("../lib/CrudOperations");
const ProductModel = require("../modules/products/Product.model");
const CategoryModel = require("../modules/categories/Category.model");
const SupplierModel = require("../modules/suppliers/Supplier.model");
const limiter = require("../middlewares/RateLimiter");
const SwaggerDocApi = require("../config/SwaggerDocApi");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());

// Extract token and refreshToken from headers
app.use((req, res, next) => {
  const { token, refreshToken } = req.headers;

  console.log("Headers: ", req.headers.cookie);
  // console.log("token:", token);
  // console.log("refreshToken:", refreshToken);
  next();
});

// Document Your APIs
SwaggerDocApi(app);

app.use(
  cors({
    origin: [process.env.CLIENT_HOST_URL, process.env.DASHBOARD_HOST_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Authentication & Authorization

// Error Handler
app.use(ErrorHandler);

// Statics Files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Endpoints
app.use("/suppliers", isAuthenticated, SupplierRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);
app.use("/supervisors", isAuthenticated, SupervisorRoutes);
app.use("/auth", limiter, AuthRoutes);

// products / categories / suppliers
app.get("/mobolap-info", isAuthenticated, async (req, res) => {
  try {
    const products = await GetDocs(ProductModel);
    const categories = await GetDocs(CategoryModel);
    const suppliers = await GetDocs(SupplierModel);
    const brands = await ProductModel.distinct("specs.brand");

    return res.status(200).json({
      products: products,
      brands: brands,
      categories: categories,
      suppliers: suppliers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Error 404 - Route Not Found
app.use((req, res, next) => {
  return res.status(404).json({ message: "Endpoint Not Found" });
});

module.exports = app;

// Connect To DATABASE
require("../config/ConnectDB");
