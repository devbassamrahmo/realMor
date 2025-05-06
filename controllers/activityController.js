const Task = require("../models/Task");
const Event = require("../models/Event");
const Call = require("../models/Call");
const { logAction } = require("../utils/logAction");

const modelsMap = {
  task: Task,
  event: Event,
  call: Call,
};

exports.createActivity = async (req, res) => {
  try {
    const { activityType } = req.query;
    const Model = modelsMap[activityType];
    if (!Model) return res.status(400).json({ error: "Invalid activity type" });

    const activity = await Model.create({ ...req.body, owner: req.user.id });

    await logAction({
      action: "create",
      user: req.user,
      targetType: "Activity",
      targetId: activity._id,
      description: `${req.user.firstname} created a ${activityType}`
    });
    
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyActivities = async (req, res) => {
  try {
    const { activityType } = req.query;
    const Model = modelsMap[activityType];
    if (!Model) return res.status(400).json({ error: "Invalid activity type" });

    const activities = await Model.find({ owner: req.user.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { activityType } = req.query;
    const Model = modelsMap[activityType];
    if (!Model) return res.status(400).json({ error: "Invalid activity type" });

    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { activityType } = req.query;
    const Model = modelsMap[activityType];
    if (!Model) return res.status(400).json({ error: "Invalid activity type" });

    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllActivities = async (req, res) => {
  try {
    const userId = req.user.id;

    const [tasks, events, calls] = await Promise.all([
      require("../models/Task").find({ owner: userId }),
      require("../models/Event").find({ owner: userId }),
      require("../models/Call").find({ owner: userId }),
    ]);

    // بنرتبهم مع بعض حسب التاريخ
    const merged = [
      ...tasks.map(task => ({ ...task.toObject(), activityType: "task" })),
      ...events.map(event => ({ ...event.toObject(), activityType: "event" })),
      ...calls.map(call => ({ ...call.toObject(), activityType: "call" }))
    ];

    merged.sort((a, b) => new Date(a.dueDate || a.createdAt) - new Date(b.dueDate || b.createdAt));

    res.status(200).json(merged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};