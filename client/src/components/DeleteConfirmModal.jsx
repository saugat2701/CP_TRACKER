import React from "react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, problem }) {
  if (!isOpen || !problem) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "450px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">🗑️ Confirm Deletion</h2>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "var(--text-main)", fontSize: "0.95rem" }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#f87171" }}>"{problem.title}"</strong> from your tracking records?
          </p>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "8px" }}>
            This action will permanently delete the record from MongoDB.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(problem._id)}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}
