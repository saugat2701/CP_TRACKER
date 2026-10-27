import React, { useState } from "react";

export default function DbStatusBanner({ dbStatus, onRetry }) {
  const [retrying, setRetrying] = useState(false);

  if (dbStatus?.database === "connected") {
    return null;
  }

  const handleRetry = async () => {
    setRetrying(true);
    await onRetry();
    setRetrying(false);
  };

  return (
    <div className="alert-banner alert-warning">
      <div>
        <strong>⚠️ Database Status: MongoDB Disconnected.</strong>
        <div style={{ fontSize: "0.82rem", marginTop: "4px", opacity: 0.9 }}>
          The Express backend is live on port 5000, but cannot connect to MongoDB.
          Start MongoDB locally (e.g. <code>net start MongoDB</code> in admin terminal) or set your MongoDB Atlas connection string in <code>server/.env</code>.
        </div>
      </div>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={handleRetry}
        disabled={retrying}
      >
        {retrying ? "Testing..." : "🔄 Retry Connection"}
      </button>
    </div>
  );
}
