const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Too many requests from this source, please try again later.",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
