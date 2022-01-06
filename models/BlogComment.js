import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  blogId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const BlogsComment = mongoose.model("comment", commentSchema);
export default BlogsComment;
