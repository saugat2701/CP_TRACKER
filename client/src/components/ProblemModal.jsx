import React, { useState, useEffect } from "react";

const COMMON_TOPICS = [
  "Arrays",
  "Strings",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Dynamic Programming",
  "Trees",
  "Graphs",
  "Greedy",
  "Math",
  "Stack / Queue",
  "Heap / Priority Queue",
  "Backtracking",
  "Bit Manipulation",
  "Other",
];

export default function ProblemModal({ isOpen, onClose, onSave, problemToEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    status: "Solved",
    notes: "",
    revisionDate: "",
  });

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when editing vs creating
  useEffect(() => {
    if (problemToEdit) {
      setFormData({
        title: problemToEdit.title || "",
        url: problemToEdit.url || "",
        platform: problemToEdit.platform || "LeetCode",
        difficulty: problemToEdit.difficulty || "Easy",
        topic: problemToEdit.topic || "Arrays",
        status: problemToEdit.status || "Solved",
        notes: problemToEdit.notes || "",
        revisionDate: problemToEdit.revisionDate
          ? new Date(problemToEdit.revisionDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        title: "",
        url: "",
        platform: "LeetCode",
        difficulty: "Easy",
        topic: "Arrays",
        status: "Solved",
        notes: "",
        revisionDate: "",
      });
    }
    setValidationError("");
  }, [problemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Problem title is required.";
    }
    if (!formData.url.trim()) {
      return "Problem URL is required.";
    }

    try {
      const parsed = new URL(formData.url.trim());
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return "URL must begin with http:// or https://";
      }
      const host = parsed.hostname.toLowerCase();
      const isLeetCode = host === "leetcode.com" || host.endsWith(".leetcode.com");
      const isCodeforces = host === "codeforces.com" || host.endsWith(".codeforces.com");

      if (!isLeetCode && !isCodeforces) {
        return "Only LeetCode (leetcode.com) and Codeforces (codeforces.com) URLs are supported.";
      }
    } catch {
      return "Please enter a valid, well-formed URL.";
    }

    if (!formData.topic.trim()) {
      return "Topic is required.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        ...formData,
        revisionDate: formData.revisionDate ? formData.revisionDate : null,
      });
      onClose();
    } catch (err) {
      setValidationError(err.message || "Failed to save problem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {problemToEdit ? "✏️ Edit Problem" : "➕ Add New Problem"}
          </h2>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {validationError && (
              <div className="alert-banner alert-danger" style={{ marginBottom: "16px" }}>
                <span>⚠️ {validationError}</span>
              </div>
            )}

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Problem Title *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g. Two Sum, Watermelon (4A)"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* URL */}
            <div className="form-group">
              <label className="form-label">Problem URL *</label>
              <input
                type="url"
                name="url"
                className="form-control"
                placeholder="https://leetcode.com/problems/... or https://codeforces.com/..."
                value={formData.url}
                onChange={handleChange}
                required
              />
              <div className="form-hint">
                Must be an active link from leetcode.com or codeforces.com
              </div>
            </div>

            {/* Platform & Difficulty */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Platform *</label>
                <select
                  name="platform"
                  className="form-control"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="Codeforces">Codeforces</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty *</label>
                <select
                  name="difficulty"
                  className="form-control"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Topic & Status */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Topic / Category *</label>
                <select
                  name="topic"
                  className="form-control"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  {COMMON_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Solved">Solved</option>
                  <option value="Attempted">Attempted</option>
                  <option value="Bookmarked">Bookmarked</option>
                </select>
              </div>
            </div>

            {/* Revision Date */}
            <div className="form-group">
              <label className="form-label">Revision Schedule (Optional)</label>
              <input
                type="date"
                name="revisionDate"
                className="form-control"
                value={formData.revisionDate}
                onChange={handleChange}
              />
              <div className="form-hint">
                Schedule a future date to re-solve or review algorithmic concepts.
              </div>
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Personal Notes & Key Takeaways</label>
              <textarea
                name="notes"
                className="form-control"
                rows="3"
                placeholder="Key insight, time complexity (e.g. O(N)), tricky edge cases..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : problemToEdit ? "Update Problem" : "Add Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
