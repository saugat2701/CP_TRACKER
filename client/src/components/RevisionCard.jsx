import React from "react";

export default function RevisionCard({
  problem,
  isDue = false,
  onComplete,
  onReschedule,
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleQuickReschedule = (daysToAdd) => {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    onReschedule(problem._id, target.toISOString().split("T")[0]);
  };

  const platformClass = problem.platform?.toLowerCase() || "leetcode";
  const diffClass = problem.difficulty?.toLowerCase() || "easy";

  return (
    <div className={`revision-card ${isDue ? "due" : ""}`}>
      <div className="revision-card-header">
        <span className={`platform-badge ${platformClass}`}>
          {problem.platform}
        </span>
        <span className={`diff-badge ${diffClass}`}>
          {problem.difficulty}
        </span>
        <span className={isDue ? "revision-due-indicator" : "revision-upcoming-indicator"}>
          {isDue ? "⚠️ DUE NOW" : "📅 UPCOMING"}
        </span>
      </div>

      <div>
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="revision-card-title"
          title="Open problem in new tab"
        >
          {problem.title} ↗
        </a>
        <div style={{ marginTop: "4px" }}>
          <span className="topic-chip">{problem.topic}</span>
        </div>
      </div>

      {problem.notes && (
        <div
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            background: "rgba(255, 255, 255, 0.03)",
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          💡 {problem.notes}
        </div>
      )}

      <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "auto" }}>
        Scheduled: <strong>{formatDate(problem.revisionDate)}</strong>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
        <button
          type="button"
          className="btn btn-success btn-sm"
          style={{ flex: 1 }}
          onClick={() => onComplete(problem._id)}
        >
          ✓ Complete
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleQuickReschedule(3)}
          title="Reschedule for 3 days from now"
        >
          +3d
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleQuickReschedule(7)}
          title="Reschedule for 7 days from now"
        >
          +7d
        </button>
      </div>
    </div>
  );
}
