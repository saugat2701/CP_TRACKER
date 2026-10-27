import React from "react";
import FilterBar from "../components/FilterBar";
import ProblemTable from "../components/ProblemTable";

export default function AllProblemsPage({
  problems = [],
  filters,
  setFilters,
  onResetFilters,
  onEditProblem,
  onDeleteProblem,
  onToggleStatus,
  onToggleBookmark,
  onOpenAddModal,
  loading = false,
}) {
  return (
    <div>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onReset={onResetFilters}
      />

      <div className="card-panel">
        <div className="panel-header">
          <h3 className="panel-title">
            <span>📋</span> Problem Records ({problems.length})
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
            <div className="empty-state-title">Loading problems...</div>
          </div>
        ) : (
          <ProblemTable
            problems={problems}
            onEdit={onEditProblem}
            onDelete={onDeleteProblem}
            onToggleStatus={onToggleStatus}
            onToggleBookmark={onToggleBookmark}
            onOpenAddModal={onOpenAddModal}
            emptyMessage="No problems match your filter criteria."
          />
        )}
      </div>
    </div>
  );
}
