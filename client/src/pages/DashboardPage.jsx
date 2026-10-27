import React from "react";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import ProblemTable from "../components/ProblemTable";
import RevisionCard from "../components/RevisionCard";

export default function DashboardPage({
  stats,
  revisions,
  onEditProblem,
  onDeleteProblem,
  onToggleStatus,
  onToggleBookmark,
  onCompleteRevision,
  onRescheduleRevision,
  onNavigateToProblems,
  onOpenAddModal,
}) {
  const {
    totalProblems = 0,
    solvedCount = 0,
    attemptedCount = 0,
    bookmarkedCount = 0,
    solvedPercentage = 0,
    platformBreakdown = { leetCode: 0, codeforces: 0 },
    difficultyBreakdown = { easy: 0, medium: 0, hard: 0 },
    recentProblems = [],
  } = stats || {};

  const dueRevisions = revisions?.due || [];

  return (
    <div>
      {/* 4 Primary Metric Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Tracked"
          value={totalProblems}
          subtext="Problems logged in database"
          icon="📚"
          accentColor="99, 102, 241"
        />
        <StatCard
          label="Solved"
          value={solvedCount}
          subtext={`${solvedPercentage}% of total logged`}
          icon="✅"
          accentColor="16, 185, 129"
        />
        <StatCard
          label="Attempted / WIP"
          value={attemptedCount}
          subtext="In progress or needs attention"
          icon="⏳"
          accentColor="59, 130, 246"
        />
        <StatCard
          label="Bookmarked"
          value={bookmarkedCount}
          subtext="Starred for interview review"
          icon="⭐"
          accentColor="168, 85, 247"
        />
      </div>

      {/* 2-Column Section: Progress Card + Urgent Revisions */}
      <div className="dashboard-columns">
        <ProgressCard
          solvedCount={solvedCount}
          totalCount={totalProblems}
          solvedPercentage={solvedPercentage}
          platformBreakdown={platformBreakdown}
          difficultyBreakdown={difficultyBreakdown}
        />

        <div className="card-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span>⚠️</span> Revisions Due ({dueRevisions.length})
            </h3>
          </div>

          {dueRevisions.length === 0 ? (
            <div className="empty-state" style={{ padding: "30px 10px" }}>
              <div style={{ fontSize: "2rem" }}>🎉</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>All caught up!</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                No problem revisions are due today.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {dueRevisions.slice(0, 2).map((problem) => (
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
      </div>

      {/* Recently Logged Problems */}
      <div className="card-panel">
        <div className="panel-header">
          <h3 className="panel-title">
            <span>⏱️</span> Recently Added Problems
          </h3>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onNavigateToProblems}
          >
            View All Problems →
          </button>
        </div>

        <ProblemTable
          problems={recentProblems}
          onEdit={onEditProblem}
          onDelete={onDeleteProblem}
          onToggleStatus={onToggleStatus}
          onToggleBookmark={onToggleBookmark}
          onOpenAddModal={onOpenAddModal}
          emptyMessage="No problems have been added yet. Add your first LeetCode or Codeforces problem to get started!"
        />
      </div>
    </div>
  );
}
