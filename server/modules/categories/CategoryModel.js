const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryDiscount: {
        type: Number,
        default: 1
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        required: Date.now
    }
});

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;