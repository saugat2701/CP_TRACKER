import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  seedDemoProblems,
  clearAllProblems,
} from "../controllers/problemController.js";
import { validateProblemPayload } from "../middleware/validateProblem.js";

const router = express.Router();

// Seed & clear demo utility routes
router.post("/seed", seedDemoProblems);
router.delete("/clear", clearAllProblems);

// Core CRUD routes
router.route("/").get(getProblems).post(validateProblemPayload, createProblem);

router
  .route("/:id")
  .get(getProblemById)
  .put(validateProblemPayload, updateProblem)
  .delete(deleteProblem);

export default router;
