const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "#MoboLap_Platform_2025";

const GenerateTokens = (id) => {
  // Generate an access token
  const accessToken = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30m",
  });

  // Generate a refresh token
  const refreshToken = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  
  // Verify the access token
  const verifyToken = jwt.verify(accessToken, JWT_SECRET);
  return { accessToken, refreshToken, verifyToken };
};

module.exports = GenerateTokens;
