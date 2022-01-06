import axios from "axios";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.body;

  // console.log("authorizate", req.headers.authorization.split(" ")[0]);
  // const token = req;

  if (req.headers.authorization) {
    const getKeys = req.headers.authorization.split(" ")[0];
    const getRefKeys = req.headers.authorization.split(" ")[1];

    jwt.verify(getKeys, "secretKey", async (err, decodedToken) => {
      if (decodedToken) {
        console.log("decod token var uğraşma");

        next();
      }

      if (err.message == "jwt expired") {
        console.log("üçücü if e girdi");
        const result = await axios.post("http://localhost:5000/login/ref", {
          refToken: token.refToken || getRefKeys,
        });
        console.log("result", result.status);

        jwt.verify(
          result.data.accessToken,
          "secretKey",
          (err, decodedToken) => {
            console.log("===========", err);
            if (err) {
              res.status(401).send("Ref TOken hatalı");
            } else {
              console.log("haaaaaaahahahahha", decodedToken);
              next();
            }
          }
        );
      } else {
        res.status(401).send("kullanıcı tokeni yok yada hatalo girildi");
      }
    });
  } else {
    res.status(401).send("token verilmedi");
  }
};

export default auth;
