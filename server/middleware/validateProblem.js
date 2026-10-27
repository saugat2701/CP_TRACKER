/**
 * Middleware to validate problem request payload
 */
export const validateProblemPayload = (req, res, next) => {
  const { title, url, platform, difficulty, topic, status } = req.body;

  // Title validation
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Problem title is required and cannot be empty.",
    });
  }

  // URL validation
  if (!url || typeof url !== "string") {
    return res.status(400).json({
      success: false,
      error: "Problem URL is required.",
    });
  }

  try {
    const parsed = new URL(url.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({
        success: false,
        error: "URL must use http:// or https:// protocol.",
      });
    }

    const host = parsed.hostname.toLowerCase();
    const isLeetCode = host === "leetcode.com" || host.endsWith(".leetcode.com");
    const isCodeforces = host === "codeforces.com" || host.endsWith(".codeforces.com");

    if (!isLeetCode && !isCodeforces) {
      return res.status(400).json({
        success: false,
        error: "URL domain must be leetcode.com or codeforces.com",
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      error: "Malformed URL provided. Please provide a valid external problem link.",
    });
  }

  // Platform validation
  if (!platform || !["LeetCode", "Codeforces"].includes(platform)) {
    return res.status(400).json({
      success: false,
      error: "Platform must be either 'LeetCode' or 'Codeforces'.",
    });
  }

  // Difficulty validation
  if (!difficulty || !["Easy", "Medium", "Hard"].includes(difficulty)) {
    return res.status(400).json({
      success: false,
      error: "Difficulty must be 'Easy', 'Medium', or 'Hard'.",
    });
  }

  // Topic validation
  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Topic is required.",
    });
  }

  // Status validation (if provided)
  if (status && !["Solved", "Attempted", "Bookmarked"].includes(status)) {
    return res.status(400).json({
      success: false,
      error: "Status must be 'Solved', 'Attempted', or 'Bookmarked'.",
    });
  }

  next();
};
