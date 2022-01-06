import mongoose from "mongoose";

const blogsReqSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

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
});

const BlogsReq = mongoose.model("blogsreq", blogsReqSchema);
export default BlogsReq;
