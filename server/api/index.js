const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const { route } = require("./Book");

const bookRouter = require("./Book");
const categoryRouter = require("./Category");
const userRouter = require("./User");
const authRouter = require("./Authentication");

router.use("/book", authentication, bookRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
module.exports = router;
