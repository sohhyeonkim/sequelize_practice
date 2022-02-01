const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.get("/login", function (req, res, next) {
  let token = jwt.sign(
    {
      userId: req.body.userId,
      password: req.body.password,
    },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "5m",
    }
  );
  console.log(token);
  res.json({ token: token });
});

module.exports = router;
