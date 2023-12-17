const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  createdAt: { type: Date, default: Date.now },
  lastUpdatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
