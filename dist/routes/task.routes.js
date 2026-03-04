"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// ADMIN route
router.get("/all", auth_middleware_1.authenticate, role_middleware_1.requireAdmin, async (req, res) => {
    const tasks = await prisma_1.default.task.findMany();
    res.json(tasks);
});
// USER routes
router.post("/", auth_middleware_1.authenticate, task_controller_1.createTask);
router.get("/", auth_middleware_1.authenticate, task_controller_1.getTasks);
router.patch("/:id", auth_middleware_1.authenticate, task_controller_1.updateTask);
router.delete("/:id", auth_middleware_1.authenticate, task_controller_1.deleteTask);
exports.default = router;
