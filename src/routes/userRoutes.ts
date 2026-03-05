import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;