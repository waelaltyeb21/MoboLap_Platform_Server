const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  discount: {
    type: Number,
    default: 1,
  },
  specs: {
    type: Object,
    required: true,
  },
  variants: {
    type: Object,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  contents: {
    type: Object,
    // required: true,
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
  status: {
    type: String,
    default: "جديد",
  },
  isAvailable: {
    type: String,
    default: "متاح",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
