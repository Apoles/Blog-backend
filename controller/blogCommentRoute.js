import BlogsComment from "../models/BlogComment.js";

export const getBLogComments = async (req, res, next) => {
  const blogs = await BlogsComment.find();

  console.log("comment get geldi");

  res.status(200).json(blogs);
};
export const createBlogComment = async (req, res) => {
  const blogs = await req.body;

  console.log("=============>", blogs);

  const newCustomer = await new BlogsComment(blogs);

  try {
    console.log("try a girdi");
    await newCustomer.save();
    res.send("tms");
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: error.message,
    });
  }
};

export const findComments = async (req, res, next) => {
  const ids = req.body;
  const find = await BlogsComment.find(
    {
      blogId: "61c05d92a26b4200de0d7001",
    },
    function (err, docs) {
      console.log(docs);
      res.send(docs);
    }
  );
};

export const deleteAllComments = async (req, res, next) => {
  const find = await BlogsComment.deleteMany();
  res.send("oldu galiba");
};
