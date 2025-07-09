const { isAuthenticated } = require("../../middlewares/Auth");
const limiter = require("../../middlewares/RateLimiter");
const { Login, GetOTP, VerifyOTP, ResetPassword } = require("./AuthController");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", Login);
AuthRoutes.post("/get-otp", isAuthenticated, limiter, GetOTP); // Auth
AuthRoutes.post("/verify-otp", isAuthenticated, limiter, VerifyOTP); // Auth
AuthRoutes.post("/reset-password", isAuthenticated, limiter, ResetPassword); // Auth

module.exports = AuthRoutes;
