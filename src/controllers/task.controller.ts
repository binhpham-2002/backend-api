import { Request, Response } from "express";
import prisma from "../prisma";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET TASKS
export const getTasks = async (req: any, res: Response) => {
  const user = req.user;

  try {
    let tasks;

    if (user.role === "ADMIN") {
      tasks = await prisma.task.findMany();
    } else {
      tasks = await prisma.task.findMany({
        where: { userId: user.id },
      });
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE TASK
export const updateTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 Ownership check
    if (task.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, completed },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE TASK
export const deleteTask = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 Ownership check
    if (task.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};