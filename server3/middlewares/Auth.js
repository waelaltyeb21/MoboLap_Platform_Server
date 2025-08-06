// Authentication & Authrization Middleware
const GenerateTokens = require("../services/GenerateTokens");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized-0" });
  }

  let token = authHeader.split(" ")[1].split(".", 3).join(".");
  if (token.startsWith("s:")) {
    token = token.slice(2);
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized1" });
  }

  // Check Json Web Token
  try {
    const VerifyToken = GenerateTokens.verifyToken(token);
    req.user = VerifyToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "jwt expired" });
    }
    return res.status(401).json({ message: "Unauthorized2" });
  }
};

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
