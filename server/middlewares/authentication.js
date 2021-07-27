const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send("TOKEN_NOT_FOUND");
  } else {
    const token = authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, "MY_PRIVATE_KEY");
      req.user = {
        id: data.id,
        username: data.username,
      };
      next();
    } catch (err) {
      res.status(401).send("INVALID_TOKEN");
    }
  }
};

module.exports = authentication;
