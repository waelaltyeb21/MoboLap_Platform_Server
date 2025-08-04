const cors = require("cors");

console.table([process.env.CLIENT_HOST_URL, process.env.DASHBOARD_HOST_URL]);

const corsOptions = cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

module.exports = corsOptions;