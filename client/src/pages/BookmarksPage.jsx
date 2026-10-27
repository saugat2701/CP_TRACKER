import React from "react";
import ProblemTable from "../components/ProblemTable";

export default function BookmarksPage({
  problems = [],
  onEditProblem,
  onDeleteProblem,
  onToggleStatus,
  onToggleBookmark,
  onOpenAddModal,
  loading = false,
}) {
  const bookmarkedProblems = problems.filter((p) => p.status === "Bookmarked");

  return (
    <div className="card-panel">
      <div className="panel-header">
        <h3 className="panel-title">
          <span>⭐</span> Bookmarked Problems ({bookmarkedProblems.length})
        </h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
        >
          + Add Problem
        </button>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-title">Loading bookmarks...</div>
        </div>
      ) : (
        <ProblemTable
          problems={bookmarkedProblems}
          onEdit={onEditProblem}
          onDelete={onDeleteProblem}
          onToggleStatus={onToggleStatus}
          onToggleBookmark={onToggleBookmark}
          onOpenAddModal={onOpenAddModal}
          emptyMessage="No bookmarked problems yet. Star or bookmark difficult problems to review them here."
        />
      )}
    </div>
  );
}
