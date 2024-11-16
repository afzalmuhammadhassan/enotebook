const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

router.get("/api/auth/", async (req, res) => {
  const data = await User.find().select("-password");
  res.status(200).json(data);
});

router.get("/api/auth/getuser/",fetchUser, async (req, res) => {
  const id = req.user.id;
  const user_1 = await User.findById(id).select("-password")
  res.status(200).json(user_1);
});

router.post(
  "/api/auth/login",
  [
    body("email", "Email is required field").notEmpty().isEmail(),
    body("password", "Password is required feild").notEmpty(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json(result);
      }
      const { email, password } = req.body;

      const user_1 = await User.findOne({ email });
      if (!user_1) {
        return res
          .status(401)
          .json({ error: "Invalid email# and/or password" });
      }

      const compare_password = await bcrypt.compare(password, user_1.password);
      if (!compare_password) {
        return res
          .status(401)
          .json({ error: "Invalid email and/or password#" });
      }
      const data = {
        id: user_1.id,
      };
      const auth_token = await jwt.sign(data, process.env.JWT_SECRET);
      res.status(200).send(auth_token);
    } catch (error) {
      res.status(500).send("Sorry, an internal error occured in serverr");
    }
  }
);

router.post(
  "/api/auth/createuser",
  [
    body("name", "Name is required field").notEmpty(),
    body("email", "Email is required field").notEmpty().isEmail(),
    body("password", "Password lenght not less than 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(500).json(result);
      }
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);
      const user_1 = new User({ name, email, password: hash_password });
      const save_result = await user_1.save();
      const data = {
        id: save_result.id,
      };
      const auth_token = await jwt.sign(data, process.env.JWT_SECRET);

      res.status(200).send(auth_token);
    } catch (error) {
      res.status(500).send("Sorry, an internal error occured in serverr");
    }
  }
);

module.exports = router;
