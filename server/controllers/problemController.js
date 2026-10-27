import Problem from "../models/Problem.js";
import { isDbConnected } from "../config/db.js";

/**
 * @desc    Get all problems with optional search, filtering, and sorting
 * @route   GET /api/problems
 */
export const getProblems = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is currently disconnected. Please verify MongoDB is running.",
      });
    }

    const { search, platform, difficulty, status, topic, needsRevision, sortBy, order } = req.query;

    const query = {};

    // Search by title or topic or tags
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ title: regex }, { topic: regex }, { tags: regex }];
    }

    // Platform filter
    if (platform && platform !== "All") {
      query.platform = platform;
    }

    // Difficulty filter
    if (difficulty && difficulty !== "All") {
      query.difficulty = difficulty;
    }

    // Status filter
    if (status && status !== "All") {
      query.status = status;
    }

    // Topic filter
    if (topic && topic !== "All") {
      query.topic = topic;
    }

    // Needs Revision filter
    if (needsRevision === "true") {
      query.revisionDate = { $ne: null };
      query.isRevisionCompleted = false;
    }

    // Sorting
    const sortField = sortBy || "createdAt";
    const sortDirection = order === "asc" ? 1 : -1;
    const sortOptions = { [sortField]: sortDirection };

    const problems = await Problem.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single problem by ID
 * @route   GET /api/problems/:id
 */
export const getProblemById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected.",
      });
    }

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: `Problem not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new problem
 * @route   POST /api/problems
 */
export const createProblem = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Cannot create problem. Database is disconnected.",
      });
    }

    const {
      title,
      url,
      platform,
      difficulty,
      topic,
      tags,
      status,
      notes,
      revisionDate,
      solvedDate,
    } = req.body;

    // Process tags array if given as comma-separated string or array
    let processedTags = [];
    if (Array.isArray(tags)) {
      processedTags = tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tags === "string" && tags.trim() !== "") {
      processedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    const problem = await Problem.create({
      title: title.trim(),
      url: url.trim(),
      platform,
      difficulty,
      topic: topic.trim(),
      tags: processedTags,
      status: status || "Solved",
      solvedDate: status === "Solved" ? solvedDate || new Date() : null,
      notes: notes ? notes.trim() : "",
      revisionDate: revisionDate ? new Date(revisionDate) : null,
      isRevisionCompleted: false,
    });

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing problem
 * @route   PUT /api/problems/:id
 */
export const updateProblem = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Cannot update problem. Database is disconnected.",
      });
    }

    const existing = await Problem.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: `Problem not found with ID: ${req.params.id}`,
      });
    }

    const {
      title,
      url,
      platform,
      difficulty,
      topic,
      tags,
      status,
      notes,
      revisionDate,
      isRevisionCompleted,
      solvedDate,
    } = req.body;

    let processedTags = existing.tags;
    if (Array.isArray(tags)) {
      processedTags = tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tags === "string") {
      processedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    // Determine solvedDate update
    let updatedSolvedDate = existing.solvedDate;
    if (status === "Solved" && !existing.solvedDate) {
      updatedSolvedDate = solvedDate ? new Date(solvedDate) : new Date();
    } else if (status && status !== "Solved") {
      updatedSolvedDate = null;
    }

    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(url && { url: url.trim() }),
        ...(platform && { platform }),
        ...(difficulty && { difficulty }),
        ...(topic && { topic: topic.trim() }),
        tags: processedTags,
        ...(status && { status }),
        solvedDate: updatedSolvedDate,
        ...(notes !== undefined && { notes: notes.trim() }),
        ...(revisionDate !== undefined && {
          revisionDate: revisionDate ? new Date(revisionDate) : null,
        }),
        ...(isRevisionCompleted !== undefined && { isRevisionCompleted }),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a problem by ID
 * @route   DELETE /api/problems/:id
 */
export const deleteProblem = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Cannot delete problem. Database is disconnected.",
      });
    }

    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: `Problem not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed sample LeetCode and Codeforces demo problems
 * @route   POST /api/problems/seed
 */
export const seedDemoProblems = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected. Cannot seed problems.",
      });
    }

    // Sample data with real valid LeetCode & Codeforces URLs
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const demoProblems = [
      {
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        platform: "LeetCode",
        difficulty: "Easy",
        topic: "Arrays",
        tags: ["Hash Table", "Arrays"],
        status: "Solved",
        notes: "Used hash map to achieve O(N) time and O(N) space. Check complement existence.",
        revisionDate: today,
        isRevisionCompleted: false,
      },
      {
        title: "Trapping Rain Water",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        platform: "LeetCode",
        difficulty: "Hard",
        topic: "Two Pointers",
        tags: ["Two Pointers", "Dynamic Programming", "Monotonic Stack"],
        status: "Attempted",
        notes: "Need to review two pointers approach with left_max and right_max.",
        revisionDate: today,
        isRevisionCompleted: false,
      },
      {
        title: "Longest Increasing Subsequence",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        platform: "LeetCode",
        difficulty: "Medium",
        topic: "DP",
        tags: ["Binary Search", "Dynamic Programming"],
        status: "Solved",
        notes: "O(N log N) patience sorting / binary search tails array approach is optimal.",
        revisionDate: tomorrow,
        isRevisionCompleted: false,
      },
      {
        title: "Watermelon (4A)",
        url: "https://codeforces.com/problemset/problem/4/A",
        platform: "Codeforces",
        difficulty: "Easy",
        topic: "Math",
        tags: ["Brute Force", "Math"],
        status: "Solved",
        notes: "Edge case: w = 2 cannot be split into two even numbers (2=1+1, both odd).",
        revisionDate: null,
        isRevisionCompleted: false,
      },
      {
        title: "Theatre Square (1A)",
        url: "https://codeforces.com/problemset/problem/1/A",
        platform: "Codeforces",
        difficulty: "Easy",
        topic: "Math",
        tags: ["Math"],
        status: "Solved",
        notes: "Use ceil division or ((n + a - 1) / a) with 64-bit integers.",
        revisionDate: null,
        isRevisionCompleted: false,
      },
      {
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        platform: "LeetCode",
        difficulty: "Medium",
        topic: "Graphs",
        tags: ["DFS", "BFS", "Topological Sort"],
        status: "Bookmarked",
        notes: "Kahn's algorithm using in-degree array or cycle detection using 3-color DFS.",
        revisionDate: tomorrow,
        isRevisionCompleted: false,
      },
    ];

    await Problem.deleteMany({}); // Clear previous records before seeding
    const inserted = await Problem.insertMany(demoProblems);

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${inserted.length} demo problems.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all problems (demo reset)
 * @route   DELETE /api/problems/clear
 */
export const clearAllProblems = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database is disconnected.",
      });
    }

    const result = await Problem.deleteMany({});
    res.status(200).json({
      success: true,
      message: `Cleared ${result.deletedCount} problems.`,
    });
  } catch (error) {
    next(error);
  }
};
