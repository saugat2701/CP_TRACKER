import React from "react";

export default function ProblemTable({
  problems = [],
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleBookmark,
  emptyMessage = "No problems found.",
  onOpenAddModal,
}) {
  if (!problems || problems.length === 0) {
    return (
      <div className="table-responsive">
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No Problems Tracked Yet</div>
          <div className="empty-state-text">{emptyMessage}</div>
          {onOpenAddModal && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ marginTop: "12px" }}
              onClick={onOpenAddModal}
            >
              + Add First Problem
            </button>
          )}
        </div>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="table-responsive">
      <table className="problem-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Problem Title</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Revision</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => {
            const platformClass = problem.platform?.toLowerCase() || "leetcode";
            const diffClass = problem.difficulty?.toLowerCase() || "easy";
            const statusClass = problem.status?.toLowerCase() || "solved";

            // Check if revision is due today or earlier
            const isRevisionDue =
              problem.revisionDate &&
              !problem.isRevisionCompleted &&
              new Date(problem.revisionDate) <= new Date();

            return (
              <tr key={problem._id}>
                {/* Platform Badge */}
                <td>
                  <span className={`platform-badge ${platformClass}`}>
                    {problem.platform === "LeetCode" ? "LC" : "CF"} {problem.platform}
                  </span>
                </td>

                {/* Problem Title & External Link */}
                <td>
                  <div className="problem-title-cell">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="problem-link-title"
                      title={`Open original problem link: ${problem.url}`}
                    >
                      <span>{problem.title}</span>
                      <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>↗</span>
                    </a>
                    {problem.notes && (
                      <div className="problem-notes-preview" title={problem.notes}>
                        💡 {problem.notes}
                      </div>
                    )}
                  </div>
                </td>

                {/* Topic */}
                <td>
                  <span className="topic-chip">{problem.topic}</span>
                </td>

                {/* Difficulty */}
                <td>
                  <span className={`diff-badge ${diffClass}`}>
                    {problem.difficulty}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <button
                    type="button"
                    className={`status-pill ${statusClass}`}
                    onClick={() => onToggleStatus && onToggleStatus(problem)}
                    title="Click to toggle status (Solved → Attempted → Bookmarked)"
                    style={{ border: "none", cursor: onToggleStatus ? "pointer" : "default" }}
                  >
                    <span>
                      {problem.status === "Solved" && "✓"}
                      {problem.status === "Attempted" && "⏳"}
                      {problem.status === "Bookmarked" && "★"}
                    </span>
                    <span>{problem.status}</span>
                  </button>
                </td>

                {/* Revision Due Date */}
                <td>
                  {problem.revisionDate ? (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: isRevisionDue ? "#f87171" : "var(--text-dim)",
                        fontWeight: isRevisionDue ? 700 : 400,
                      }}
                    >
                      {isRevisionDue ? "⚠️ Due " : "📅 "}
                      {formatDate(problem.revisionDate)}
                    </span>
                  ) : (
                    <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>None</span>
                  )}
                </td>

                {/* Actions */}
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
                    {/* Open Problem explicitly */}
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      title="Open problem in new tab"
                    >
                      ↗
                    </a>

                    {/* Edit button */}
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => onEdit(problem)}
                      title="Edit Problem"
                    >
                      ✏️
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={() => onDelete(problem)}
                      title="Delete Problem"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
