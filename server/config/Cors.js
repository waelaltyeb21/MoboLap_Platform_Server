const cors = require("cors");
const app = require("../api");
console.table([process.env.CLIENT_HOST_URL, process.env.DASHBOARD_HOST_URL]);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
