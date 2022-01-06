import baseResponseTrue from "../dto/baseResponse.js";
import Blogs from "../models/blogModule.js";

export const getBLogs = async (req, res, next) => {
  const blogs = await Blogs.find();

  console.log("get geldi");
  console.log(req.baseUrl);

  res.status(200).json(blogs);
};

export const createBlog = async (req, res) => {
  const blogs = await req.body;

  console.log("=============>", blogs);
  /*
  const newCustomer = await new Blogs(ids);

  try {
    console.log("try a girdi");
    await newCustomer.save();
    res.send("tms");
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: error.message,
    });
  }*/
  res.status(200).json(blogs);
};

export const getOneBlog = async (req, res) => {
  try {
    const ids = req.params;
    console.log(ids);
    const findOne = await Blogs.findById(
      { _id: ids.userId },
      {},
      {},
      (err, res) => {
        console.log(err), console.log(res);
      }
    ).clone();

    baseResponseTrue.data = findOne;
    await res.send(baseResponseTrue);
  } catch (error) {
    res.status(404).send({
      message: "hata",
      admin: "creater by apoles",
    });
  }
};

export const likeAppand = async (req, res, next) => {
  const ids = req.params;
  try {
    const findOne = await Blogs.findOneAndUpdate(
      { _id: ids.userId },
      { $inc: { like: 1 } },
      {}
      /* (err, doc, res) => {
        if (err) {
          console.log(err);instagram.com/taner/
        }
        if (doc) {
          console.log(doc);
        }
        if (res) {
          console.log(res);
        }
      }*/
    ).clone();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  res.send("ok");
};

export const likeDelete = async (req, res, next) => {
  const ids = req.params;
  try {
    const findOne = await Blogs.findOneAndUpdate(
      { _id: ids.userId },
      { $inc: { like: -1 } },
      {}
      /* (err, doc, res) => {
        if (err) {
          console.log(err);
        }
        if (doc) {
          console.log(doc);
        }
        if (res) {
          console.log(res);
        }
      }*/
    ).clone();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  res.send("ok");
};
