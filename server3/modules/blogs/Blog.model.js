const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  //   image: {
  //     type: String,
  //     required: true,
  //   },
  likes: {
    type: Number,
    default: 0,
  },
  publishedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "supervisors",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
