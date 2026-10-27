import React from "react";

export default function Sidebar({
  currentView,
  setCurrentView,
  dueRevisionsCount = 0,
  bookmarkedCount = 0,
  mobileOpen,
  setMobileOpen,
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "problems", label: "All Problems", icon: "📝" },
    {
      id: "revision",
      label: "Revision Queue",
      icon: "🔄",
      badge: dueRevisionsCount > 0 ? dueRevisionsCount : null,
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      icon: "⭐",
      badge: bookmarkedCount > 0 ? bookmarkedCount : null,
    },
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-icon">⚡</div>
        <div>
          <div className="brand-title">CP Task Manager</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${currentView === item.id ? "active" : ""}`}
            onClick={() => {
              setCurrentView(item.id);
              if (setMobileOpen) setMobileOpen(false);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge !== null && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
