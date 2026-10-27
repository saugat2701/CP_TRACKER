import React from "react";
import RevisionCard from "../components/RevisionCard";

export default function RevisionPage({
  revisions,
  onCompleteRevision,
  onRescheduleRevision,
  onOpenAddModal,
  loading = false,
}) {
  const dueList = revisions?.due || [];
  const upcomingList = revisions?.upcoming || [];

  if (loading) {
    return (
      <div className="card-panel">
        <div className="empty-state">
          <div className="empty-state-title">Loading revision queue...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Due Revisions Section */}
      <div className="card-panel">
        <div className="panel-header">
          <h3 className="panel-title">
            <span>⚠️</span> Due For Revision ({dueList.length})
          </h3>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onOpenAddModal}
          >
            + Add Problem
          </button>
        </div>

        {dueList.length === 0 ? (
          <div className="empty-state" style={{ padding: "30px 10px" }}>
            <div style={{ fontSize: "2rem" }}>🎉</div>
            <div style={{ fontWeight: 600 }}>No Revisions Due Today</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
              Great job! All scheduled problems are up to date.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {dueList.map((problem) => (
              <RevisionCard
                key={problem._id}
                problem={problem}
                isDue={true}
                onComplete={onCompleteRevision}
                onReschedule={onRescheduleRevision}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Revisions Section */}
      <div className="card-panel">
        <div className="panel-header">
          <h3 className="panel-title">
            <span>📅</span> Upcoming Revisions ({upcomingList.length})
          </h3>
        </div>

        {upcomingList.length === 0 ? (
          <div className="empty-state" style={{ padding: "30px 10px" }}>
            <div style={{ fontSize: "2rem" }}>🗓️</div>
            <div style={{ fontWeight: 600 }}>No Upcoming Revisions Scheduled</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
              Set a revision date when adding problems to practice spaced repetition.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {upcomingList.map((problem) => (
              <RevisionCard
                key={problem._id}
                problem={problem}
                isDue={false}
                onComplete={onCompleteRevision}
                onReschedule={onRescheduleRevision}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
