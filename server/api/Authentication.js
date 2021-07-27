const express = require("express");
const authServices = require("../services/authentication");

const router = express.Router();

router.post("/register", (req, res) => {
  authServices.register(req.body.username, req.body.password);
  res.send("REGISTER SUCCESS");
});
router.post("/login", async (req, res) => {
  const userWithToken = await authServices.login(
    req.body.username,
    req.body.password
  );
  //   res.json(userWithToken);
});

module.exports = router;
