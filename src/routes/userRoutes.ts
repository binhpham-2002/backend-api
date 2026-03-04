import { Router } from "express";

const router = Router();

// GET /api/users
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Binh" },
    { id: 2, name: "Demo User" }
  ]);
});

export default router;