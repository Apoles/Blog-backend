import express from "express";
import { getblogReq, createBlogReq } from "../controller/blogreqController.js";

const blogReqRoute = express.Router();
blogReqRoute.get("/", getblogReq);
blogReqRoute.post("/", createBlogReq);

export default blogReqRoute;
