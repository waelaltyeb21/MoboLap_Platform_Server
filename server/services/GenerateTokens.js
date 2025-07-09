const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "#MoboLap_Platform_2025";

const GenerateTokens = {
  // Generate an access token
  accessToken: (payload, expiresIn = "30m") =>
    jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn,
    }),

  // Generate a refresh token
  refreshToken: (payload, expiresIn = "1d") =>
    jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn,
    }),

  // Verify the access token
  verifyToken: () => jwt.verify(accessToken, JWT_SECRET),
};

module.exports = GenerateTokens;
