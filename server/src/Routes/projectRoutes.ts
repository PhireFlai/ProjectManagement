import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { updateTaskStatus } from "../controllers/taskController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
