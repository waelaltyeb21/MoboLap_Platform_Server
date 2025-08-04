const { isAuthenticated } = require("../../middlewares/Auth");
const limiter = require("../../middlewares/RateLimiter");
const {
  Login,
  GetOTP,
  VerifyOTP,
  ResetPassword,
} = require("./Auth.controller");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", Login);
AuthRoutes.post("/get-otp", limiter, GetOTP); // Auth
AuthRoutes.post("/verify-otp", limiter, VerifyOTP); // Auth
AuthRoutes.post("/reset-password", limiter, ResetPassword); // Auth

module.exports = AuthRoutes;
