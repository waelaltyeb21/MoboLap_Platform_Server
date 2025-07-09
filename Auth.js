const jwt = require("jsonwebtoken");

const SecretKey = process.env.SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized-0" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized1" });
  }

  // Check Json Web Token
  try {
    const VerifyToken = jwt.verify(token, SecretKey);
    req.user = VerifyToken;
    console.log("VerifyToken: ", VerifyToken);
    next();
  } catch (err) {
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
