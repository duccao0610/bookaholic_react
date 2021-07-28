const express = require("express");
const authServices = require("../services/authentication");

const router = express.Router();

router.post("/register", async (req, res) => {
  const message = await authServices.register(
    req.body.username,
    req.body.password,
    req.body.nickname
  );
  res.json(message);
});
router.post("/login", async (req, res) => {
  const message = await authServices.login(
    req.body.username,
    req.body.password
  );
  res.json(message);
});

module.exports = router;
