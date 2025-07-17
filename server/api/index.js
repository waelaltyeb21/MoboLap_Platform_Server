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
const { SwaggerUi, SwaggerSpecs } = require("../config/SwaggerDocApi");
const { isAuthenticated } = require("../middlewares/Auth");
const { GetDocs } = require("../lib/CrudOperations");
const ProductModel = require("../modules/products/Product.model");
const CategoryModel = require("../modules/categories/Category.model");
const SupplierModel = require("../modules/suppliers/Supplier.model");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerSpecs));
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
app.use("/suppliers", SupplierRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);
app.use("/supervisors", SupervisorRoutes);
app.use("/auth", AuthRoutes);

// products / categories / suppliers
app.get("/mobolap-info", async (req, res) => {
  try {
    const products = await GetDocs(ProductModel);
    const categories = await GetDocs(CategoryModel);
    const suppliers = await GetDocs(SupplierModel);

    return res.status(200).json({
      message: "Mobolap Info",
      products: products,
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

app.listen(5000, () => {
  console.log("Server Is Running!");
});

module.exports = app;

// Connect To DATABASE
require("../config/ConnectDB");
