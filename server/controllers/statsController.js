import Problem from "../models/Problem.js";
import { isDbConnected } from "../config/db.js";

/**
 * @desc    Get dashboard statistics calculated dynamically from MongoDB records
 * @route   GET /api/stats
 */
export const getStats = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected. Cannot retrieve statistics.",
      });
    }

    const totalProblems = await Problem.countDocuments();
    const solvedCount = await Problem.countDocuments({ status: "Solved" });
    const attemptedCount = await Problem.countDocuments({ status: "Attempted" });
    const bookmarkedCount = await Problem.countDocuments({ status: "Bookmarked" });

    // Platform breakdown
    const leetCodeCount = await Problem.countDocuments({ platform: "LeetCode" });
    const codeforcesCount = await Problem.countDocuments({ platform: "Codeforces" });

    // Difficulty breakdown
    const easyCount = await Problem.countDocuments({ difficulty: "Easy" });
    const mediumCount = await Problem.countDocuments({ difficulty: "Medium" });
    const hardCount = await Problem.countDocuments({ difficulty: "Hard" });

    // Revision calculations: end of current local day
    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const dueRevisionsCount = await Problem.countDocuments({
      revisionDate: { $ne: null, $lte: endOfToday },
      isRevisionCompleted: false,
    });

    const upcomingRevisionsCount = await Problem.countDocuments({
      revisionDate: { $gt: endOfToday },
      isRevisionCompleted: false,
    });

    // 5 most recently added problems
    const recentProblems = await Problem.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title url platform difficulty status topic createdAt");

    // Percentage solved
    const solvedPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalProblems,
        solvedCount,
        attemptedCount,
        bookmarkedCount,
        solvedPercentage,
        platformBreakdown: {
          leetCode: leetCodeCount,
          codeforces: codeforcesCount,
        },
        difficultyBreakdown: {
          easy: easyCount,
          medium: mediumCount,
          hard: hardCount,
        },
        revisions: {
          due: dueRevisionsCount,
          upcoming: upcomingRevisionsCount,
        },
        recentProblems,
      },
    });
  } catch (error) {
    next(error);
  }
};
