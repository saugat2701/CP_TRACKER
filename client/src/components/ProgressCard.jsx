import React from "react";

export default function ProgressCard({
  solvedCount = 0,
  totalCount = 0,
  solvedPercentage = 0,
  platformBreakdown = { leetCode: 0, codeforces: 0 },
  difficultyBreakdown = { easy: 0, medium: 0, hard: 0 },
}) {
  return (
    <div className="card-panel">
      <div className="panel-header">
        <h3 className="panel-title">
          <span>🎯</span> Practice Completion
        </h3>
        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
          {solvedCount} of {totalCount} solved
        </span>
      </div>

      <div className="progress-container">
        <div className="progress-header">
          <span>Target Progress</span>
          <span style={{ color: "#34d399" }}>{solvedPercentage}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(solvedPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="progress-stats-row">
        <div className="mini-stat-box">
          <div className="mini-stat-title">Platform Ratio</div>
          <div className="mini-stat-val">
            <span style={{ color: "var(--accent-leetcode)" }}>{platformBreakdown.leetCode} LC</span>
            <span style={{ color: "var(--text-dim)", margin: "0 6px" }}>/</span>
            <span style={{ color: "var(--accent-codeforces)" }}>{platformBreakdown.codeforces} CF</span>
          </div>
        </div>

        <div className="mini-stat-box">
          <div className="mini-stat-title">Difficulty Mix</div>
          <div className="mini-stat-val" style={{ fontSize: "0.9rem" }}>
            <span style={{ color: "var(--diff-easy)" }}>{difficultyBreakdown.easy} Easy</span>
            {" · "}
            <span style={{ color: "var(--diff-medium)" }}>{difficultyBreakdown.medium} Med</span>
            {" · "}
            <span style={{ color: "var(--diff-hard)" }}>{difficultyBreakdown.hard} Hard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
