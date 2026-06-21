const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (_req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const title = String(req.body.task || "").trim();
  if (!title) {
    return res.status(400).json({ error: "Task cannot be empty" });
  }

  const task = { id: Date.now(), title };
  tasks.push(task);
  return res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const originalLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== Number(req.params.id));
  if (tasks.length === originalLength) {
    return res.status(404).json({ error: "Task not found" });
  }
  return res.status(204).send();
});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running on port ${port}`);
});
