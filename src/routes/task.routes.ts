import { Router } from "express";
import prisma from "../prisma";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";

const router = Router();

// ADMIN route
router.get("/all", authenticate, requireAdmin, async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// USER routes
router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);
router.patch("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;