const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, deadline, priority, categories } = req.body;
  try {
    const task = new Task({
      title,
      description,
      deadline,
      priority,
      userId: req.user.id,
      categories,
    });
    await task.save();
    req.io.emit("task created", task); // Emit event
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, deadline, priority, status, categories } =
    req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, priority, status, categories },
      { new: true }
    );
    req.io.emit("task updated", task); // Emit event
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    req.io.emit("task deleted", req.params.id); // Emit event
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.searchTasks = async (req, res) => {
  const { query } = req.query;
  try {
    const tasks = await Task.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
