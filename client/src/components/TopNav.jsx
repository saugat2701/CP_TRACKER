import React from "react";

export default function TopNav({
  title,
  dbStatus,
  onRetryDb,
  onOpenAddModal,
  onSeedDemo,
  onToggleMobileSidebar,
}) {
  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="top-nav-right">
        {/* Primary Call to Action */}
        <button type="button" className="btn btn-primary" onClick={onOpenAddModal}>
          <span>+</span> Add Problem
        </button>
      </div>
    </header>
  );
}
