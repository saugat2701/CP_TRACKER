import React from "react";

export default function StatCard({ label, value, subtext, icon, accentColor = "var(--primary)" }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div className="stat-icon" style={{ backgroundColor: `rgba(${accentColor}, 0.15)` }}>
          {icon}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
}
