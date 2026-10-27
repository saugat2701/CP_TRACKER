import mongoose from "mongoose";

/**
 * Validates external problem URLs
 * Ensures only safe HTTP/HTTPS URLs from supported platforms (LeetCode, Codeforces)
 */
const validateProblemUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    // Allow leetcode.com, codeforces.com, and their subdomains
    const isLeetCode = hostname === "leetcode.com" || hostname.endsWith(".leetcode.com");
    const isCodeforces = hostname === "codeforces.com" || hostname.endsWith(".codeforces.com");
    return isLeetCode || isCodeforces;
  } catch {
    return false;
  }
};

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    url: {
      type: String,
      required: [true, "Problem URL is required"],
      trim: true,
      validate: {
        validator: validateProblemUrl,
        message: "URL must be a valid HTTP/HTTPS link from leetcode.com or codeforces.com",
      },
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      enum: {
        values: ["LeetCode", "Codeforces"],
        message: "{VALUE} is not a supported platform (choose LeetCode or Codeforces)",
      },
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "{VALUE} is not a valid difficulty (choose Easy, Medium, or Hard)",
      },
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["Solved", "Attempted", "Bookmarked"],
        message: "{VALUE} is not a valid status (choose Solved, Attempted, or Bookmarked)",
      },
      default: "Solved",
    },
    solvedDate: {
      type: Date,
      default: function () {
        return this.status === "Solved" ? new Date() : null;
      },
    },
    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
    },
    revisionDate: {
      type: Date,
      default: null,
    },
    isRevisionCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Indexes for high performance searches and filters
problemSchema.index({ platform: 1, difficulty: 1, status: 1 });
problemSchema.index({ revisionDate: 1, isRevisionCompleted: 1 });
problemSchema.index({ title: "text", topic: "text" });

export default mongoose.model("Problem", problemSchema);
