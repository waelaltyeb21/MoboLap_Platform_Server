const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: Object,
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
  puplishedAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
