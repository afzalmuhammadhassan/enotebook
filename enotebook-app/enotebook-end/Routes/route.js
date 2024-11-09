const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const router = express.Router();

router.get("/", async(req, res) => {
    const data = await User.find().select("-password");
  res.status(200).json(data);
});

router.post(
  "/createuser",
  [
    body("name", "Name is required field").notEmpty(),
    body("email", "Email is required field").notEmpty().isEmail(),
    body("password", "Password lenght not less than 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(500).json(result);
    }
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const user_1 = new User({ name, email, password: hash_password });
    await user_1.save();
    res.status(200).send(user_1);
  }
);
module.exports = router;
