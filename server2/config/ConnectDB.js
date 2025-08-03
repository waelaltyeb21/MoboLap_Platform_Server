const { default: mongoose } = require("mongoose");
const app = require("../api");

const EstablishConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME || "MOBOLAP_PLATFORM",
      timeoutMS: process.env.DB_TIME_OUT || 10000,
    });

    if (connect.connection.readyState === 1) {
      app.listen(process.env.SERVER_PORT || 5500);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

EstablishConnection();
