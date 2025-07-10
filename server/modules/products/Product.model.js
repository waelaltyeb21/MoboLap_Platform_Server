const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 1,
  },
  specs: {
    type: Object,
    required: true,
    //      {
    //         brand: "", // HONOR / Lenovo
    //         screen: "", // 6.88 / 16 inches == 1224x2700
    //         battery: "", // 5600mh / ( 7800mh / 6 - 9 Hours) == تدعم الشحن السريع بقوة 65 واط
    //         ram: "", // 8 GB / 16 GB
    //         storage: "", // 512 GB
    //         model: "", // 2025
    //         camera: "", // 108 MP / Web Cam
    //         fingerprint: "", // On Screen / Support
    //         cpu: "", // Snapdragon / ( Intel / Ryzan )
    //         gpu: "", // - / -
    //         os: "", // Android / Windows
    //     }
  },
  image: {
    type: String,
    required: true,
  },
  contents: {
    type: Object,
    required: true,
  },
  supplierId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "suppliers",
    required: true,
  },
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "categories",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
