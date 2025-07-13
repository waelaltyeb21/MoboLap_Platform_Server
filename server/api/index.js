const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

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
const { Encrypt } = require("../services/Encryption");
const { SwaggerUi, SwaggerSpecs } = require("../config/SwaggerDocApi");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerSpecs));

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
