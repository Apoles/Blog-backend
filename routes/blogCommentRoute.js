import express from "express";
import {
  createBlogComment,
  deleteAllComments,
  findComments,
  getBLogComments,
} from "../controller/blogCommentRoute.js";

const blogCommentRoute = express.Router();
blogCommentRoute.get("/", getBLogComments);
blogCommentRoute.post("/", createBlogComment);
blogCommentRoute.post("/many", findComments);
blogCommentRoute.delete("/", deleteAllComments);
export default blogCommentRoute;
