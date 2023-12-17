const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateAuthToken, authenticateToken } = require("../utils/auth");

const router = express.Router();

// Create User
router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Account already exists");

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateAuthToken(user),
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
