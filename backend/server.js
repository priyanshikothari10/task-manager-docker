const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json({ message: "Task added" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
app.get("/add", (req, res) => {
  tasks.push("Learn Docker");
  res.send("Task added");
});