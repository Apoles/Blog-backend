import express from "express";
import {
  getBLogs,
  getOneBlog,
  createBlog,
  likeAppand,
  likeDelete,
} from "../controller/blogController.js";

const blogRoute = express.Router();
blogRoute.get("/", getBLogs);
blogRoute.post("/", createBlog);

blogRoute.get("/find/:userId", getOneBlog);
blogRoute.get("/like/:userId", likeAppand);
blogRoute.get("/likeDelete/:userId", likeDelete);

export default blogRoute;
