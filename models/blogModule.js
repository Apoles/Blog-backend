import mongoose from "mongoose";

const blogsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mainTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now(),
  },
  like: {
    type: Number,
    default: 0,
  },
  comment: {
    tpye: Object,
  },
});

const Blogs = mongoose.model("blogs", blogsSchema);
export default Blogs;
