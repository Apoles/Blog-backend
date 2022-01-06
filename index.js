import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoute from "./routes/blogRoute.js";
import bodyParser from "body-parser";

import swaggerUiExpress from "swagger-ui-express";
import { openapiSpecification } from "./config/swaggerConfig.js";
import blogReqRoute from "./routes/blogreqRoute.js";
import blogCommentRoute from "./routes/blogCommentRoute.js";
import loginRoute from "./routes/userRoute.js";
//import { swaggerDocsConfig } from "./config/swaggerConfig.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(openapiSpecification)
);

dotenv.config();

app.use(cors());
const PORT = process.env.PORT || 5000;
const CONNTECTION_URL = process.env.CONNTECTION_URL;

app.use("/blog", blogRoute);
app.use("/blogreq", blogReqRoute);
app.use("/comment", blogCommentRoute);
app.use("/login", loginRoute);

const url =
  "mongodb+srv://Chandlers:Apoles123.@nodeblock.jlxam.mongodb.net/blog?retryWrites=true";
app.get("/", (req, res) => {
  res.send({
    message: "nice and quick server",
    admin: "create by APoles",
    message2: "2. server",
  });
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server çalisiyor", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
