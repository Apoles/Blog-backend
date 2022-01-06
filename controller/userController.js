import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import loginResponse from "../dto/loginDto.js";
import userResponse from "../dto/userDto.js";
import baseResponseTrue from "../dto/baseResponse.js";

const maxAge = 60 * 60;
const refresMaxAge = 60 * 60 * 2;
const message = {
  message: "BU ALAN RİSKLİDİR",
  admin: "CREATER BY APOLES",
  status: "401 NOT  AUTHORIZED ",
};

const createToken = (id) => {
  return jwt.sign({ id }, "secretKey", { expiresIn: maxAge });
};
const refreshToken = (id) => {
  return jwt.sign({ id }, "Apoles123.", {
    expiresIn: refresMaxAge,
  });
};

export const getUser = async (req, res) => {
  const posts = await User.find();
  const a = JSON.stringify(message, null, 2);

  console.log(a);
  res.send(posts);
  //res.status(200).json(posts);
};

export const createUsers = async (req, res) => {
  const post = req.body;
  console.log("========>", post);
  const newPost = new User(post);
  userResponse.data.age = post.age;
  userResponse.data.atName = post.atName;
  userResponse.data.name = post.name;
  userResponse.data.surName = post.surName;
  userResponse.data.userName = post.userName;

  try {
    console.log("try a girdi");
    await newPost.save();
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.login(userName, password);
  if (user) {
    const token = createToken(user._id);
    const refToken = refreshToken(user._id);
    loginResponse.data = {
      token: token,
      refToken: refToken,
      id: user._id,
      atName: user.atName,
    };

    res.status(200).json(loginResponse);
  }

  if (!user) {
    res.status(401).send({
      message: "Kullanıcı adı yada parola hatalı",
      admin: "Creater by APoles",
    });
  }
};

export const createTokFromRefTok = async (req, res, next) => {
  const refTok = req.body;
  console.log("refTok", refTok.refToken);
  if (!refTok) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  const user = jwt.verify(
    refTok.refToken,
    "Apoles123.",
    (err, decodedToken) => {
      if (err) {
        res.send("hatalıyız");
      } else return decodedToken;
    }
  );
  console.log(user);

  if (user) {
    const { id } = user;
    console.log("=>", id);
    const accessToken = jwt.sign({ id }, "secretKey", {
      expiresIn: maxAge,
    });
    console.log(accessToken);
    res.status(200).json({ accessToken });
  }
};

export const logins = async (req, res) => {
  const user = await User.login(userName, password);
  const token = createToken(user._id);
  res.cookie("denemes", token);
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
};

/*   SİGN METODU ALTERNETİF
export const signden = async (req, res) => {
  const post = req.body;
  const userName = post.userName;
  const password = post.password;

  const isExist = await User.findOne({ userName });
  if (isExist) {
    const auth = await bcyrpt.compare(password, isExist.password);
    if (auth) {
      console.log("auth", auth);
      const token = createToken(isExist._id);

      res.status(200).json({ Headers: token });
    } else {
      console.log("parola hata");
      return res.status(401).send("hata");
    }
  } else {
    console.log("kullancı hata");
  }
};
*/

export const getOneUser = async (req, res) => {
  try {
    const ids = req.params;
    console.log(ids);
    const findOne = await User.findById(
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
    console.log(error);
    res.status(404).send({
      message: "hata",
      admin: "creater by apoles",
    });
  }
};
