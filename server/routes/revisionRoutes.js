import express from "express";
import {
  getRevisions,
  markRevisionComplete,
  rescheduleRevision,
} from "../controllers/revisionController.js";

const router = express.Router();

router.get("/", getRevisions);
router.put("/:id/complete", markRevisionComplete);
router.put("/:id/reschedule", rescheduleRevision);

export default router;
