const Call = require('../models/Call.model');
const Event = require("../models/Event.model");
const Task = require("../models/Task.model");

// Create Call
exports.createCall = async (req, res) => {
    try {
        const call = new Call(req.body);
        await call.save();
        res.status(201).json(call);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create Task
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all Calls
exports.getCalls = async (req, res) => {
    try {
        const calls = await Call.find();
        res.status(200).json(calls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
