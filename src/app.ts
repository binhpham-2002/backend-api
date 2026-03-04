import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import taskRoutes from "./routes/task.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Backend API running...");
});

app.use("/api/auth", authRoutes);

app.get("/api/profile", authenticate, (req, res) => {
  res.json({ message: "Protected route accessed", user: (req as any).user });
});

app.use("/api/tasks", taskRoutes);

export default app;