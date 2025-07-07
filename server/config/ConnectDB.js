const { default: mongoose } = require("mongoose");
const app = require("../api");

const EstablishConnection = async () =>  {
    try {
  
        const connect = await mongoose.connect(process.env.DB_URI, {
            dbName: process.env.DB_NAME || "MOBOLAP_PLATFORM",
            // user: process.env.DB_USER || "WAEL_ALTYEB",
            // pass: process.env.DB_PASS || "PASSWORD",
            timeoutMS: process.env.DB_TIME_OUT || 10000,
        });
        
        if(connect.connection.readyState === 1) {
            app.listen(process.env.SERVER_PORT)
        }
    } catch (error) {
        console.error("Error: ", error)
    }
}

EstablishConnection();