const express = require("express");
const app = express();
require("dotenv").config();
const ErrorHandler = require("../middlewares/ErrorHandler");
const SupplierRoutes = require("../modules/suppliers/SupplierRoutes");
const CategoryRoutes = require("../modules/categories/CategoryRoutes");
  
// Middlewares
app.use(express.json())  

// Error Handler
app.use(ErrorHandler);


app.get("/", async (req, res) => {
    res.json({message: "Hello World"})
})

// Endpoints
app.use("/suppliers", SupplierRoutes);
app.use("/categories", CategoryRoutes);

app.listen(5000, () => {
    console.log("Server Is Running!")
})

module.exports = app;

// Connect To DATABASE
require("../config/ConnectDB");