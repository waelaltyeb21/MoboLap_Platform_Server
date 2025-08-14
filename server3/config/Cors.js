const cors = require("cors");

const corsOptions = cors({
  origin: [process.env.CLIENT_HOST_URL, process.env.DASHBOARD_HOST_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

module.exports = corsOptions;