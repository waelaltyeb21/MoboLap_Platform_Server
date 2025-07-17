const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 1,
  },
  //   brands: {
  //     type: Array,
  //     default: [{ name: "", value: "" }],
  //   },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;
