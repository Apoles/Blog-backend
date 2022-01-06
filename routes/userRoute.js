import express from "express";
import {
  createTokFromRefTok,
  createUsers,
  getOneUser,
  getUser,
  login,
} from "../controller/userController.js";

import auth from "../middlewares/middleAuth.js";

const loginRoute = express.Router();

loginRoute.get("/", getUser);
loginRoute.post("/", createUsers);
loginRoute.post("/log", login);
loginRoute.post("/ref", createTokFromRefTok);
loginRoute.get("/find/:userId", getOneUser);
export default loginRoute;
