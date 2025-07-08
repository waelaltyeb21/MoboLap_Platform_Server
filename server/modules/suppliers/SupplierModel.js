const { default: mongoose } = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String, // Wael Altyeb
        required: true,
    },
    address: {
        type: Object, // City ( Port Sudan )  - Place ( Makkah Market ) - Store Name ( MoboLap Store )
        required: true,
    },
    contact: {
        type: Object, // Phone - Second Phone Number
        required: true
    },
    status: {
        type: String, // Pendding - 
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

const SupplierModel = mongoose.model("suppliers", SupplierSchema);

module.exports = SupplierModel;