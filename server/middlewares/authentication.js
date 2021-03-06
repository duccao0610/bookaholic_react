const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send("TOKEN_NOT_FOUND");
  } else {
    const token = authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, "MY_PRIVATE_KEY");
      //Pass data from middleware to next via req
      console.log("DATA", data);
      req.user = {
        id: data.id,
        username: data.username,
        nickname: data.nickname,
        expireTime: data.exp,
      };
      next();
    } catch (err) {
      console.log(err);
      // res.status(401).send("INVALID_TOKEN");
      res.send({ message: false });
    }
  }
};

module.exports = authentication;
