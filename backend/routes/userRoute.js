const express = require("express");
const userRoute = express.Router();

const {
    getUser,
    getUsers,
  } = require("../controllers/userControls");
const { submit } = require("../utils/auth");

userRoute.get("/getUser/:id", getUser);
userRoute.get("/getUsers", getUsers);
userRoute.post("/submit", submit);

module.exports = {
    userRoute,
  };