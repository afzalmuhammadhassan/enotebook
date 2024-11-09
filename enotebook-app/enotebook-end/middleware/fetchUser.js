const express = require("express");
const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (!result) {
      return res.status(401).send("Invalid token");
    }
    req.user = result;
    next();
  } catch (error) {
    res.status(500).send("Sorry, an internal error occured in server");
  }
};

module.exports = fetchUser;
