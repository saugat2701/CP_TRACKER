import Problem from "../models/Problem.js";
import { isDbConnected } from "../config/db.js";

/**
 * @desc    Get problems organized by revision status (due today/earlier vs upcoming)
 * @route   GET /api/revisions
 */
export const getRevisions = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected.",
      });
    }

    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // Problems due today or earlier that are not marked completed
    const due = await Problem.find({
      revisionDate: { $ne: null, $lte: endOfToday },
      isRevisionCompleted: false,
    }).sort({ revisionDate: 1 });

    // Problems due in the future
    const upcoming = await Problem.find({
      revisionDate: { $gt: endOfToday },
      isRevisionCompleted: false,
    }).sort({ revisionDate: 1 });

    // Recently completed revisions
    const completed = await Problem.find({
      isRevisionCompleted: true,
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        dueCount: due.length,
        upcomingCount: upcoming.length,
        completedCount: completed.length,
        due,
        upcoming,
        completed,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark a problem revision as completed
 * @route   PUT /api/revisions/:id/complete
 */
export const markRevisionComplete = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected.",
      });
    }

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { isRevisionCompleted: true },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: `Problem with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Revision marked as completed",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reschedule a problem revision date
 * @route   PUT /api/revisions/:id/reschedule
 */
export const rescheduleRevision = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected.",
      });
    }

    const { revisionDate } = req.body;
    if (!revisionDate) {
      return res.status(400).json({
        success: false,
        error: "A valid new revisionDate is required to reschedule.",
      });
    }

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      {
        revisionDate: new Date(revisionDate),
        isRevisionCompleted: false,
      },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: `Problem with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Revision rescheduled successfully",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};
