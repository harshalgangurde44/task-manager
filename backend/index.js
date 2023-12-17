const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");

const Task = require("./models/task");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // create a new task
  socket.on("create_task", async (payload) => {
    try {
      const newTask = await Task.create({
        title: payload.title,
        author: {
          name: payload.author.name,
          id: payload.author.id,
        },
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
      });

      const tasks = await Task.find().sort({ lastUpdatedAt: -1 });
      socket.broadcast.emit("tasks", tasks);
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  // delete task
  socket.on("delete_task", async (taskId) => {
    try {
      await Task.findByIdAndDelete(taskId);

      const tasks = await Task.find().sort({ lastUpdatedAt: -1 });
      socket.broadcast.emit("tasks", tasks);
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  // update task
  socket.on("update_task", async (payload) => {
    try {
      await Task.findByIdAndUpdate(payload.id, payload.updatedTask);

      const tasks = await Task.find().sort({ lastUpdatedAt: -1 });
      socket.broadcast.emit("tasks", tasks);
    } catch (error) {
      console.log("Error: ", error);
    }
  });
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
    server.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed to connect ", error);
  });
