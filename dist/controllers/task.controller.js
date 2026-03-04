"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// CREATE TASK
const createTask = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;
    try {
        const task = await prisma_1.default.task.create({
            data: {
                title,
                userId,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createTask = createTask;
// GET TASKS
const getTasks = async (req, res) => {
    const user = req.user;
    try {
        let tasks;
        if (user.role === "ADMIN") {
            tasks = await prisma_1.default.task.findMany();
        }
        else {
            tasks = await prisma_1.default.task.findMany({
                where: { userId: user.id },
            });
        }
        res.json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getTasks = getTasks;
// UPDATE TASK
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const task = await prisma_1.default.task.findUnique({
            where: { id: Number(id) },
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        // 🔐 Ownership check
        if (task.userId !== req.user.id && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Not authorized" });
        }
        const updatedTask = await prisma_1.default.task.update({
            where: { id: Number(id) },
            data: { title, completed },
        });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateTask = updateTask;
// DELETE TASK
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma_1.default.task.findUnique({
            where: { id: Number(id) },
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        // 🔐 Ownership check
        if (task.userId !== req.user.id && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Not authorized" });
        }
        await prisma_1.default.task.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteTask = deleteTask;
