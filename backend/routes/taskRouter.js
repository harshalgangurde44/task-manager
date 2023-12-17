const express = require("express");

const Task = require("../models/task");
const { authenticateToken } = require("../utils/auth");

const router = express.Router();

// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ lastUpdatedAt: -1 });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
